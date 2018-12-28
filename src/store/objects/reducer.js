import {
	CREATION_OBJECT_SUCCESS,
	FETCHING_OBJECTS_SUCCESS
} from './action-types'

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
		case CREATION_OBJECT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					objects: [payload.result, ...state[payload.ecosystem].objects]
				}
			}
		}
		default:
			return state
	}
}
