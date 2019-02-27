import * as REST from '../api/rest'
import { clearData, logoutUser } from './auth/actions'
import {
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	fetchingEcosystemsFailure
} from './ecosystems/actions'
import { finishStartup } from './global/actions'

export function startup() {
	return async (dispatch, getState) => {
		console.log('STARTUP')
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
		}
	}
}

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
