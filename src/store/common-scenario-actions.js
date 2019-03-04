import * as REST from '../api/rest'
import { clearData, logoutUser } from './auth/actions'
import {
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	fetchingEcosystemsFailure
} from './ecosystems/actions'
import { finishStartup } from './global/actions'
import { setError } from './user/actions'

export function startup() {
	return async (dispatch, getState) => {
		if (getState().auth.isAuthenticated) {
			try {
				dispatch(fetchingEcosystemsStarted())
				const results = await REST.fetchEcosystems({
					customer: getState().auth.selectedCustomer.id
				})
				dispatch(fetchingEcosystemsSuccess(results))
			} catch (err) {
				dispatch(fetchingEcosystemsFailure(err))
			} finally {
				dispatch(finishStartup())
			}
		} else {
			dispatch(finishStartup())
		}
	}
}

export function logout() {
	return async dispatch => {
		try {
			await REST.logout()
		} finally {
			dispatch(logoutUser())
			dispatch(setError('You have been logged out'))
			dispatch(clearData())
		}
	}
}
