import {
	LOGIN_FAILURE,
	LOGIN_REQUESTED,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	RENEW_TOKEN,
	SET_CUSTOMER
} from './action-types'

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

export function logoutUser() {
	return {
		type: LOGOUT_USER
	}
}

export function renewToken() {
	return {
		type: RENEW_TOKEN
	}
}

export function setCustomer(customer) {
	return {
		type: SET_CUSTOMER,
		payload: customer
	}
}
