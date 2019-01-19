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
			const loginResult = await REST.login(credentials)
			dispatch(loginSuccess(loginResult))
			if (redirect) {
				history.push(redirect)
			} else {
				history.goBack()
			}
		} catch (err) {
			dispatch(loginFailed(err))
		}
	}
}
