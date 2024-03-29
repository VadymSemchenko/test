import {
	FETCHING_OBJECTS_FAILURE,
	FETCHING_OBJECTS_REQUESTED,
	FETCHING_OBJECTS_SUCCESS,
	CREATION_OBJECT_FAILURE,
	CREATION_OBJECT_REQUESTED,
	CREATION_OBJECT_SUCCESS,
	UPDATE_OBJECT_REQUESTED,
	UPDATE_OBJECT_SUCCESS,
	UPDATE_OBJECT_FAILURE
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

export function creationObjectStarted() {
	return {
		type: CREATION_OBJECT_REQUESTED
	}
}

export function creationObjectSuccess(result, ecosystem) {
	return {
		type: CREATION_OBJECT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function creationObjectFailed(err) {
	return {
		type: CREATION_OBJECT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function updateObjectStarted() {
	return {
		type: UPDATE_OBJECT_REQUESTED
	}
}

export function updateObjectSuccess(result, ecosystem) {
	return {
		type: UPDATE_OBJECT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function updateObjectFailed(err) {
	return {
		type: UPDATE_OBJECT_FAILURE,
		payload: {
			message: err
		}
	}
}
