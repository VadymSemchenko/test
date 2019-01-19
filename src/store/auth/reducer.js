import { LOGIN_FAILURE, LOGIN_SUCCESS } from './action-types'

const initialState = {
	isAuthenticated: false,
	token: ''
}

export function authReducer(state = initialState, { type, payload }) {
	switch (type) {
		case LOGIN_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				token: ''
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				token: payload.accessToken
			}
		default:
			return state
	}
}
