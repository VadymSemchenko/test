import * as REST from '../../api/rest'
import history from '../../history'
import {
	loginFailed,
	loginStarted,
	loginSuccess
} from '../../store/auth/actions'

export function login(credentials, redirect) {
	return async dispatch => {
		try {
			dispatch(loginStarted())
			const loginResult = await REST.login({
				username: credentials.email,
				password: credentials.password
			})
			dispatch(loginSuccess(loginResult))
			history.push('/auth/customers', { from: redirect })
		} catch (err) {
			dispatch(loginFailed(err))
		}
	}
}
