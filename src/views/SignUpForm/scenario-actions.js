import { set, get } from 'lodash'
import { createUser, fulfillUser, loginUserForToken } from '../../api/rest'
import {
	startLoading,
	finishLoading,
	setError,
	setUser
} from '../../store/user/actions'
import { LOCAL_ACCESS_TOKEN_KEY } from '../../enums'

export const registerEmail = email => async dispatch => {
	dispatch(startLoading())
	try {
		const { data } = await createUser(email)
		dispatch(setUser(data))
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
	const {
		user: { email, uuid }
	} = getState()
	set(creds, 'email', email)
	set(creds, 'uuid', uuid)
	try {
		const result = await loginUserForToken(email)
		const token = get(result, ['data', 'accessToken'], '')
		localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, token)
		// dispatch(loginSuccess(token))
	} catch (error) {
		console.log('ERROR AT REGISTERING FOR TOKEN')
		const status = get(error, ['response', 'status'], null)
		dispatch(finishLoading())
		switch (+status) {
			case 400:
				return dispatch(setError('Wrong payload, missing username or password'))
			case 401:
				return dispatch(setError('Invalid username or password!'))
			case 404:
				return dispatch(
					setError('No username, wrong username, wrong password!')
				)
			case 500:
				return dispatch(setError('Internal server error!'))
			case 522:
				return dispatch(setError('Gateway connection timeout!'))
			default:
				return dispatch(setError('Error while authorising user!'))
		}
	}
	try {
		console.log('ATTEMPT TO FULFILL USER')
		const user = await fulfillUser(creds)
		console.log('USER', user)
		dispatch(setUser(user))
	} catch (error) {
		console.log('ERROR AT REGISTERING USER', error)
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
