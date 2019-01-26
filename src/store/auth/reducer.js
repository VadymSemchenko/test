import moment from 'moment'
import {
	LOCAL_ACCESS_TOKEN_EXPIRY_TIME,
	LOCAL_ACCESS_TOKEN_KEY
} from '../../enums'
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

const initialState = {
	isAuthenticated:
		localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY) !== null &&
		expiryTimeFromStorage !== null &&
		moment(expiryTimeFromStorage).isAfter(),
	tokenExpireAt:
		expiryTimeFromStorage !== null && moment(expiryTimeFromStorage).isAfter(),
	customers: [],
	selectedCustomer: null
}

export function authReducer(state = initialState, { type, payload }) {
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
			return {
				...state,
				isAuthenticated: true,
				tokenExpireAt: moment()
					.add(process.env.REACT_APP_TOKEN_EXPIRATION_TIME, 'minutes')
					.toISOString(),
				customers: [
					{
						id: 1,
						name: 'Test #1'
					},
					{
						id: 2,
						name: 'Test #2'
					}
				]
			}
		case LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				selectedCustomer: null,
				customers: []
			}
		case RENEW_TOKEN:
			// eslint-disable-next-line no-case-declarations
			const expiryTime = moment()
				.add(process.env.REACT_APP_TOKEN_EXPIRATION_TIME, 'minutes')
				.toISOString()
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
