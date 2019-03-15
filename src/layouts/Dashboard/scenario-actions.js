import {
	setCurrentEcosystem,
	loadEcosystemStarted,
	loadEcosystemSuccess
} from '../../store/ecosystems/actions'
import * as REST from '../../api/rest'

export function loadEcosystem(ecosystemUUID) {
	return async (dispatch, getState) => {
		try {
			dispatch(loadEcosystemStarted())
			const ecosystem = getState().ecosystems.items.find(
				eco => eco.uuid === ecosystemUUID
			)
			if (ecosystem) {
				dispatch(setCurrentEcosystem(ecosystem))
			}
			const [groups] = await Promise.all([
				REST.fetchGroups({
					ecosystem,
					customer: getState().auth.selectedCustomer
				})
			])
			dispatch(
				loadEcosystemSuccess({
					groups
				})
			)
		} catch (err) {
			console.log(err)
		}
	}
}
