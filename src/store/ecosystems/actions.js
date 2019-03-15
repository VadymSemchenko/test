import { createAction } from 'redux-actions'
import {
	CREATE_ECOSYSTEM_GROUP_REQUESTED,
	APPEND_NEW_SERVICE,
	CREATE_ECOSYSTEM_FAILURE,
	CREATE_ECOSYSTEM_REQUESTED,
	CREATE_ECOSYSTEM_SUCCESS,
	FETCHING_ECOSYSTEMS_FAILURE,
	FETCHING_ECOSYSTEMS_REQUESTED,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM,
	LOAD_ECOSYSTEM_REQUESTED,
	LOAD_ECOSYSTEM_SUCCESS,
	CREATE_ECOSYSTEM_GROUP_SUCCESS,
	CREATE_ECOSYSTEM_GROUP_FAILURE
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

export function createEcosystemStarted() {
	return {
		type: CREATE_ECOSYSTEM_REQUESTED
	}
}

export function createEcosystemSuccess(result) {
	return {
		type: CREATE_ECOSYSTEM_SUCCESS,
		payload: result
	}
}

export function createEcosystemFailed(err) {
	return {
		type: CREATE_ECOSYSTEM_FAILURE,
		payload: err
	}
}

export function appendNewService(service, ecosystem) {
	return {
		type: APPEND_NEW_SERVICE,
		payload: {
			ecosystem,
			service
		}
	}
}

export function loadEcosystemStarted() {
	return {
		type: LOAD_ECOSYSTEM_REQUESTED
	}
}

export function loadEcosystemSuccess(data) {
	return {
		type: LOAD_ECOSYSTEM_SUCCESS,
		payload: data
	}
}

export const createEcosystemGroupRequested = createAction(
	CREATE_ECOSYSTEM_GROUP_REQUESTED
)
export const createEcosystemGroupSuccess = createAction(
	CREATE_ECOSYSTEM_GROUP_SUCCESS
)
export const createEcosystemGroupFailure = createAction(
	CREATE_ECOSYSTEM_GROUP_FAILURE
)
