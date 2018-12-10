import { FETCHING_REPORTS_SUCCESS } from './action-types'
import sortBy from 'lodash/sortBy'

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
				items: sortBy(items, 'date')
			}
		}
		default:
			return state
	}
}
