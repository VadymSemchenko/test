import {
	FETCHING_OBJECTS_FAILURE,
	FETCHING_OBJECTS_REQUESTED,
	FETCHING_OBJECTS_SUCCESS
} from './action-types'

export function fetchingObjectsStarted() {
	return {
		type: FETCHING_OBJECTS_REQUESTED
	}
}

export function fetchingObjectsSuccess(results, ecosystem) {
	return {
		type: FETCHING_OBJECTS_SUCCESS,
		payload: {
			results,
			ecosystem
		}
	}
}

export function fetchingObjectsFailed(err) {
	return {
		type: FETCHING_OBJECTS_FAILURE,
		payload: {
			message: err
		}
	}
}
