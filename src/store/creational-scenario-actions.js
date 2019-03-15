import * as REST from '../api/rest'
import { toast } from 'react-toastify'
import {
	createEcosystemGroupRequested,
	createEcosystemGroupSuccess,
	createEcosystemGroupFailure
} from './ecosystems/actions'

export function createGroup(name) {
	return async (dispatch, getState) => {
		try {
			dispatch(createEcosystemGroupRequested())
			const result = await REST.createGroup({
				customer: getState().auth.selectedCustomer,
				ecosystem: getState().ecosystems.currentEcosystem,
				name
			})
			dispatch(createEcosystemGroupSuccess(result))
		} catch (err) {
			toast.error('Cannot create group. Try again later!')
			dispatch(createEcosystemGroupFailure(err))
		}
	}
}
