import get from 'lodash/get'
import set from 'lodash/set'

import {
	createResponseErrorMessage,
	extractResponseErrorStatus
} from '../../utils/reponseErrorHandler'
import {
	createUser,
	loginUserForToken,
	readUserData,
	fulfillUser
} from './apiCalls'
import { LOCAL_ACCESS_TOKEN_KEY } from '../../enums'
import {
	startLoading,
	finishLoading,
	setError,
	setUser,
	confirmEmail
} from '../../store/user/actions'
import history from '../../history'
import { loginSuccess } from '../../store/auth/actions'

export const registerEmail = email => async dispatch => {
	dispatch(startLoading())
	try {
		const result = await createUser(email)
		console.log('RESULT AT REGISTER EMAIL', result)
		const { data } = result
		// const { data } = await createUser(email)
		dispatch(setUser(data))
	} catch (error) {
		console.dir(error)
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			409: 'This email is already taken!',
			400: 'Wrong payload, missing email!',
			default: 'Error while registering email!'
		}
		const errorMessage = createResponseErrorMessage({
			status,
			specificErrorHandler
		})
		dispatch(setError(errorMessage))
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
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload, missing username or password',
			401: 'Invalid username or password!',
			404: 'No username, wrong username, wrong password!',
			default: 'Error while authorising user!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		dispatch(setError(errorMessage))
	} finally {
		dispatch(finishLoading())
	}
	try {
		const user = await fulfillUser(creds)
		dispatch(setUser(user))
		history.replace('/auth/customers/new')
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload, missing username or password',
			401: 'Invalid username or password!',
			404: 'No username, wrong username, wrong password!',
			default: 'Error while registering user!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		dispatch(setError(errorMessage))
	} finally {
		dispatch(finishLoading())
	}
}

export const checkIfTheTokenIsValid = username => async dispatch => {
	console.log('USERNAME AT CHECK IF THE TOKEN IS VALID', username)
	dispatch(startLoading())
	try {
		const result = await loginUserForToken(username)
		const accessToken = get(result, ['data', 'accessToken'], '')
		console.log('ACCESS_TOKEN', accessToken)
		localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken)
		const response = await readUserData(username)
		console.log('RESPONE AT CHECK TOKEN FOR VALIDITY', response)
		dispatch(confirmEmail())
		console.log('RESPONSE AT CHECK IF TOKEN IS VALID', response)
	} catch (error) {
		console.log('ERROR AT CHECK IF TOKEN IS VALID', error)
	} finally {
		dispatch(finishLoading())
	}
}
