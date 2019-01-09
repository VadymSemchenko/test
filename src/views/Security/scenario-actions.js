import { fetchingPoliciesFailed, fetchingPoliciesStarted, fetchingPoliciesSuccess } from '../../store/policies/actions'
import * as REST from '../../api/rest'

export function fetchPolicies () {
  return async (dispatch, getState) => {
    try {
      const ecosystem = getState().ecosystems.currentEcosystem
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

export function createPolicy (entity, type) {
  return async (dispatch, getState) => {
    try {
      // const ecosystem = getState().ecosystems.currentEcosystem
      // dispatch(creationObjectStarted())
      // const objects = await REST.createObject(entity, type, ecosystem)
      // dispatch(creationObjectSuccess(objects, ecosystem))
    } catch (err) {
      // dispatch(creationObjectFailed(err))
    }
  }
}

export function updatePolicy (entity) {
  return async (dispatch, getState) => {
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
