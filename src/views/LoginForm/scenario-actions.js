import jwt from 'jsonwebtoken'
import * as REST from '../../api/rest'
import history from '../../history'
import {
	loginFailed,
	loginStarted,
	loginSuccess
} from '../../store/auth/actions'
import { extractCustomers } from '../../utils/utils'

export function login(credentials, redirect) {
	return async dispatch => {
		try {
			dispatch(loginStarted())
			const result = await REST.login({
				username: credentials.email,
				password: credentials.password
			})
			const decodedToken = jwt.decode(result.accessToken, { json: true })
			dispatch(
				loginSuccess({
					accessToken: result.accessToken,
					customers: extractCustomers(decodedToken.roles)
				})
			)
			history.push('/auth/customers', { from: redirect })
		} catch (err) {
			dispatch(loginFailed(err))
		}
	}
}
