import { LOGIN_FAILURE, LOGIN_REQUESTED, LOGIN_SUCCESS } from './action-types'

export function loginStarted() {
	return {
		type: LOGIN_REQUESTED
	}
}

export function loginSuccess(token) {
	return {
		type: LOGIN_SUCCESS,
		payload: token
	}
}

export function loginFailed(err) {
	return {
		type: LOGIN_FAILURE,
		payload: err
	}
}
