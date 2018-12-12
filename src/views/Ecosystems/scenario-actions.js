import * as REST from '../../api/rest'
import history from '../../history'
import {
	fetchingEcosystemsFailure,
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	setCurrentEcosystem
} from '../../store/ecosystems/actions'

export function fetchEcosystems() {
	return async dispatch => {
		try {
			dispatch(fetchingEcosystemsStarted())
			const results = await REST.fetchEcosystems()
			dispatch(fetchingEcosystemsSuccess(results))
		} catch (err) {
			dispatch(fetchingEcosystemsFailure(err))
		}
	}
}

export function openEcosystem(ecosystem) {
	return dispatch => {
		dispatch(setCurrentEcosystem(ecosystem))
		history.push(`/ecosystems/${ecosystem.id}/reports`) // TO BE CHANGED later
	}
}
