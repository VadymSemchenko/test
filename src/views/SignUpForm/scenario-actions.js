import get from 'lodash/get'
import set from 'lodash/set'
import { rest } from '../../api/rest'
import {
	startLoading,
	finishLoading,
	setError,
	setUser
} from '../../store/user/actions'
import history from '../../history'
import { loginSuccess } from '../../store/auth/actions'

export const createUser = email => rest.post('/v2/users', { email })

export const loginUserForToken = email =>
	rest.post(`v2/auth/login`, { username: email, password: 'VeryLongDefP@SS' })

export const fulfillUser = ({ email, firstName, lastName }) => {
	const path = `/v2/users/${email}`
	return rest.put(path, { email, firstName, lastName })
}

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
		const accessToken = get(result, ['data', 'accessToken'], '')
		dispatch(
			loginSuccess({
				accessToken,
				customers: []
			})
		)
	} catch (error) {
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
		const user = await fulfillUser(creds)
		dispatch(setUser(user))
		history.replace('/auth/customers/new')
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

export const checkIfTheTokenIsValid = username => async dispatch => {
	console.log('START TOKEN CHECKING')
	dispatch(startLoading())
	try {
		const response = await rest.get(`users/${username}`)
		console.log('RESPONSE AT CHECK IF TOKEN IS VALID', response)
	} catch (error) {
		console.log('ERROR AT CHECK IF TOKEN IS VALID', error)
	} finally {
		dispatch(finishLoading())
	}
}
