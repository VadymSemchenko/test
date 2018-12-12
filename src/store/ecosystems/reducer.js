import {
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM
} from './action-types'

const initialState = {
	reports: {
		items: [],
		currentEcosystem: ''
	}
}

export function ecosystemsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_ECOSYSTEMS_SUCCESS: {
			return {
				...state,
				items: payload
			}
		}
		case SET_CURRENT_ECOSYSTEM: {
			return {
				...state,
				currentEcosystem: payload.id
			}
		}
		default:
			return state
	}
}
