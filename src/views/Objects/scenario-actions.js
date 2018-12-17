import * as REST from '../../api/rest'
import {
	fetchingObjectsFailed,
	fetchingObjectsStarted,
	fetchingObjectsSuccess
} from '../../store/objects/actions'


export function fetchObjects() {
	return async (dispatch,getState) => {
		try {
		  const ecosystem = getState().ecosystems.currentEcosystem
			console.log(ecosystem)
			dispatch(fetchingObjectsStarted())
			const objects = await REST.fetchObjects({
        customer: '',
        ecosystem
      })
      console.log(objects)
			dispatch(fetchingObjectsSuccess(objects, ecosystem))
		} catch (err) {
			dispatch(fetchingObjectsFailed(err))
		}
	}
}
