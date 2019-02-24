import { set, get } from 'lodash'
import { createUser, fulfillUser } from '../../api/rest'
import {
	startLoading,
	finishLoading,
	setError,
	setUser
} from '../../store/user/actions'

export const registerEmail = email => async dispatch => {
	dispatch(startLoading())
	try {
		const user = await createUser(email)
		dispatch(setUser(user))
	} catch (error) {
		const status = get(error, ['response', 'status'], null)
		switch (+status) {
			case 409:
				return dispatch(setError('This email is already taken!'))
			case 400:
				return dispatch(setError('Wrong payload, missing email!'))
			case 422:
				return dispatch(setError('Request payload is invalid!'))
			case 500:
				return dispatch(setError('Internal server error!'))
			case 522:
				return dispatch(setError('Gateway connection timeout!'))
			default:
				return dispatch(setError('Error while registering email!'))
		}
	} finally {
		dispatch(finishLoading())
	}
}

export const completeUser = creds => async (dispatch, getState) => {
	dispatch(startLoading())
	const email = get(getState(), ['user', 'email'])
	set(creds, 'email', email)
	try {
		const user = await fulfillUser(creds)
		dispatch(setUser(user))
	} catch (error) {
		const status = get(error, ['response', 'status'], null)

		switch (+status) {
			case 400:
				return dispatch(
					setError('Wrong payload, missing first name, last name or password!')
				)
			case 401:
				return dispatch(setError('Invalid first name, last name or password!'))
			case 403:
				return dispatch(
					setError('You don`t have permissions to provide this operation!')
				)
			case 500:
				return dispatch(setError('Internal server error!'))
			case 522:
				return dispatch(setError('Gateway connection timeout!'))
			default:
				return dispatch(setError('Error while registering user!'))
		}
	} finally {
		dispatch(finishLoading())
	}
}
