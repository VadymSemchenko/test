import history from '../../history'
import { setCustomer } from '../../store/auth/actions'

export function useCustomer(customer, redirect) {
	return async dispatch => {
		dispatch(setCustomer(customer))
		history.push(redirect)
	}
}
