import moment from 'moment'
import {
	LOCAL_ACCESS_TOKEN_EXPIRY_TIME,
	LOCAL_ACCESS_TOKEN_KEY
} from '../../enums'
import {
	extractCustomerFromToken,
	extractUsernameFromToken
} from '../../utils/utils'
import {
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	RENEW_TOKEN,
	SET_CUSTOMER
} from './action-types'

const expiryTimeFromStorage = localStorage.getItem(
	LOCAL_ACCESS_TOKEN_EXPIRY_TIME
)
const tokenFromStorage = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

let initialState

if (tokenFromStorage) {
	initialState = {
		isAuthenticated:
			expiryTimeFromStorage !== null && moment(expiryTimeFromStorage).isAfter(),
		tokenExpireAt:
			expiryTimeFromStorage !== null && moment(expiryTimeFromStorage).isAfter(),
		customers: extractCustomerFromToken(tokenFromStorage),
		selectedCustomer: {},
		username: extractUsernameFromToken(tokenFromStorage)
	}
} else {
	initialState = {
		isAuthenticated: false,
		tokenExpireAt: '',
		customers: [],
		selectedCustomer: null,
		username: ''
	}
}

export function authReducer(state = initialState, { type, payload }) {
	const expiryTime = moment()
		.add(process.env.REACT_APP_TOKEN_EXPIRATION_TIME, 'minutes')
		.toISOString()

	switch (type) {
		case LOGIN_FAILURE:
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			return {
				...state,
				isAuthenticated: false,
				selectedCustomer: null,
				customers: []
			}
		case LOGIN_SUCCESS:
			localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, payload.accessToken)
			localStorage.setItem(LOCAL_ACCESS_TOKEN_EXPIRY_TIME, expiryTime)
			return {
				...state,
				isAuthenticated: true,
				tokenExpireAt: expiryTime,
				customers: payload.customers,
				username: extractUsernameFromToken(payload.accessToken)
			}
		case LOGOUT_USER:
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_EXPIRY_TIME)
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			return {
				...state,
				isAuthenticated: false,
				selectedCustomer: null,
				tokenExpireAt: '',
				customers: [],
				username: ''
			}
		case RENEW_TOKEN:
			localStorage.setItem(LOCAL_ACCESS_TOKEN_EXPIRY_TIME, expiryTime)
			return {
				...state,
				tokenExpireAt: expiryTime
			}
		case SET_CUSTOMER:
			return {
				...state,
				selectedCustomer: payload
			}
		default:
			return state
	}
}
