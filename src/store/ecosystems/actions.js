import {
	FETCHING_ECOSYSTEMS_FAILURE,
	FETCHING_ECOSYSTEMS_REQUESTED,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM
} from './action-types'

export function setCurrentEcosystem(ecosystem) {
	return {
		type: SET_CURRENT_ECOSYSTEM,
		payload: ecosystem
	}
}

export function fetchingEcosystemsStarted() {
	return {
		type: FETCHING_ECOSYSTEMS_REQUESTED
	}
}

export function fetchingEcosystemsSuccess(results) {
	return {
		type: FETCHING_ECOSYSTEMS_SUCCESS,
		payload: results
	}
}

export function fetchingEcosystemsFailure(err) {
	return {
		type: FETCHING_ECOSYSTEMS_FAILURE,
		payload: {
			message: err
		}
	}
}
