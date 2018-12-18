import { FETCHING_OBJECTS_SUCCESS } from './action-types'

const initialState = {}

export function objectsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_OBJECTS_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					objects: payload.results
				}
			}
		}
		default:
			return state
	}
}
