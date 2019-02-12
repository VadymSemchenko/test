import * as REST from '../../api/rest'
import { appendNewService } from '../../store/ecosystems/actions'
import {
	creationPolicyFailed,
	creationPolicyStarted,
	creationPolicySuccess,
	fetchingPoliciesFailed,
	fetchingPoliciesStarted,
	fetchingPoliciesSuccess
} from '../../store/policies/actions'

export function fetchPolicies() {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			console.log(ecosystem)
			dispatch(fetchingPoliciesStarted())
			const objects = await REST.fetchPolicies({
				customer: '',
				ecosystem
			})
			dispatch(fetchingPoliciesSuccess(objects, ecosystem))
		} catch (err) {
			dispatch(fetchingPoliciesFailed(err))
		}
	}
}

export function createPolicy(policy) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem.id
			dispatch(creationPolicyStarted())
			const createdPolicy = await REST.createPolicy(policy, ecosystem)
			dispatch(creationPolicySuccess(createdPolicy, ecosystem))
		} catch (err) {
			dispatch(creationPolicyFailed(err))
		}
	}
}

export function updatePolicy() {
	return async () => {
		try {
			// const ecosystem = getState().ecosystems.currentEcosystem
			// dispatch(updateObjectStarted())
			// const objects = await REST.updateObject(entity, ecosystem)
			// dispatch(updateObjectSuccess(objects, ecosystem))
		} catch (err) {
			// dispatch(updateObjectFailed(err))
		}
	}
}

export function createService(service) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			// dispatch(updateObjectStarted())
			const createdService = await REST.createService(service, ecosystem)
			dispatch(appendNewService(createdService, ecosystem))
		} catch (err) {
			// dispatch(updateObjectFailed(err))
		}
	}
}
