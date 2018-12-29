import * as REST from '../../api/rest'
import {
	creationObjectFailed,
	creationObjectStarted,
	creationObjectSuccess,
	fetchingObjectsFailed,
	fetchingObjectsStarted,
	fetchingObjectsSuccess
} from '../../store/objects/actions'

export function fetchObjects() {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(fetchingObjectsStarted())
			const objects = await REST.fetchObjects({
				customer: '',
				ecosystem
			})
			dispatch(fetchingObjectsSuccess(objects, ecosystem))
		} catch (err) {
			dispatch(fetchingObjectsFailed(err))
		}
	}
}

export function createObject(entity, type) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(creationObjectStarted())
			const objects = await REST.createObject(entity, type, ecosystem)
			dispatch(creationObjectSuccess(objects, ecosystem))
		} catch (err) {
			dispatch(creationObjectFailed(err))
		}
	}
}