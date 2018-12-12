import { FETCHING_REPORTS_SUCCESS } from './action-types'
import orderBy from 'lodash/orderBy'

const initialState = {
	reports: {
		items: []
	}
}

export function reportsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_REPORTS_SUCCESS: {
			const items = payload.append
				? [...payload.results, ...state.items]
				: payload.results
			return {
				...state,
				items: orderBy(items, ['date'], ['desc'])
			}
		}
		default:
			return state
	}
}
