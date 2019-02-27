import {
	setCurrentEcosystem,
	loadEcosystemStarted,
	loadEcosystemSuccess
} from '../../store/ecosystems/actions'

export function loadEcosystem(ecosystemUUID) {
	return (dispatch, getState) => {
		dispatch(loadEcosystemStarted())
		const ecosystem = getState().ecosystems.items.find(
			eco => eco.uuid === ecosystemUUID
		)
		if (ecosystem) {
			dispatch(setCurrentEcosystem(ecosystem))
		}
		dispatch(loadEcosystemSuccess())
	}
}
