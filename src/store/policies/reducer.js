import { CLEAR_DATA } from '../common-action-types'
import {
	CREATION_POLICY_SUCCESS,
	FETCHING_POLICIES_SUCCESS,
	UPDATE_POLICY_SUCCESS
} from './action-types'

const initialState = {}

export function policyReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_POLICIES_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					policies: payload.results
				}
			}
		}
		case CREATION_POLICY_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					policies: [payload.result, ...state[payload.ecosystem].policies]
				}
			}
		}
		case UPDATE_POLICY_SUCCESS: {
			return {
				...state,
				[payload.ecosystem]: {
					...state[payload.ecosystem],
					policies: state[payload.ecosystem].policies.map(ob =>
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