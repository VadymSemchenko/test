import * as REST from '../api/rest'
import { clearData, logoutUser } from './auth/actions'

export function logout() {
	return async dispatch => {
		try {
			await REST.logout()
		} finally {
			dispatch(logoutUser())
			dispatch(clearData())
		}
	}
}
