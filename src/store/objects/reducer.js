import { CLEAR_DATA } from '../common-action-types'
import {
	CREATION_OBJECT_SUCCESS,
	FETCHING_OBJECTS_SUCCESS,
	UPDATE_OBJECT_SUCCESS
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
		case UPDATE_OBJECT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					objects: state[payload.ecosystem].objects.map(ob =>
						ob.id === payload.result.id ? payload.result : ob
					)
				}
			}
		}
		case CLEAR_DATA: {
			return initialState
		}
		default:
			return state
	}
}
