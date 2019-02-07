import {
	FETCHING_POLICIES_FAILURE,
	FETCHING_POLICIES_REQUESTED,
	FETCHING_POLICIES_SUCCESS,
	CREATION_POLICY_FAILURE,
	CREATION_POLICY_REQUESTED,
	CREATION_POLICY_SUCCESS,
	UPDATE_POLICY_REQUESTED,
	UPDATE_POLICY_SUCCESS,
	UPDATE_POLICY_FAILURE
} from './action-types'

export function fetchingPoliciesStarted() {
	return {
		type: FETCHING_POLICIES_REQUESTED
	}
}

export function fetchingPoliciesSuccess(results, ecosystem) {
	return {
		type: FETCHING_POLICIES_SUCCESS,
		payload: {
			results,
			ecosystem
		}
	}
}

export function fetchingPoliciesFailed(err) {
	return {
		type: FETCHING_POLICIES_FAILURE,
		payload: {
			message: err
		}
	}
}

export function creationPolicyStarted() {
	return {
		type: CREATION_POLICY_REQUESTED
	}
}

export function creationPolicySuccess(result, ecosystem) {
	return {
		type: CREATION_POLICY_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function creationPolicyFailed(err) {
	return {
		type: CREATION_POLICY_FAILURE,
		payload: {
			message: err
		}
	}
}

export function updatePolicyStarted() {
	return {
		type: UPDATE_POLICY_REQUESTED
	}
}

export function updatePolicySuccess(result, ecosystem) {
	return {
		type: UPDATE_POLICY_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function updatePolicyFailed(err) {
	return {
		type: UPDATE_POLICY_FAILURE,
		payload: {
			message: err
		}
	}
}
