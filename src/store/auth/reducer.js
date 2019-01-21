import { LOGIN_FAILURE, LOGIN_SUCCESS } from './action-types'
const LOCAL_ACCESS_TOKEN_KEY = 'wedge_access_token'

const initialState = {
	isAuthenticated: localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY) !== null,
	token: localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
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
			localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, payload.accessToken)
			return {
				...state,
				isAuthenticated: true,
				token: payload.accessToken
			}
		default:
			return state
	}
}
