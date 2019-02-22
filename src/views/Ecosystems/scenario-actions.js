import * as REST from '../../api/rest'
import history from '../../history'
import Cookie from 'js-cookie'
import { toast } from 'react-toastify'
import {
	createEcosystemFailed,
	createEcosystemStarted,
	createEcosystemSuccess,
	fetchingEcosystemsFailure,
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	setCurrentEcosystem
} from '../../store/ecosystems/actions'

export function fetchEcosystems() {
	return async (dispatch, getState) => {
		try {
			dispatch(fetchingEcosystemsStarted())
			const results = await REST.fetchEcosystems({
				customer: getState().auth.selectedCustomer.id
			})
			dispatch(fetchingEcosystemsSuccess(results))
		} catch (err) {
			dispatch(fetchingEcosystemsFailure(err))
		}
	}
}

export function openEcosystem(ecosystem) {
	return dispatch => {
		dispatch(setCurrentEcosystem(ecosystem))
		Cookie.set('currentEcosystem', ecosystem)
		history.push(`/ecosystems/${ecosystem.uuid}/objects`) // TO BE CHANGED later
	}
}

export function createEcosystem(ecosystem) {
	return async (dispatch, getState) => {
		try {
			dispatch(createEcosystemStarted())
			const results = await REST.createEcosystem({
				entity: ecosystem,
				customer: getState().auth.selectedCustomer.id
			})
			dispatch(createEcosystemSuccess(results))
		} catch (err) {
			dispatch(createEcosystemFailed(err))
			toast.error('Creation ecosystem failed. Try again later!')
		}
	}
}
