import Cookie from 'js-cookie'
import sortBy from 'lodash/sortBy'
import { CLEAR_DATA } from '../common-action-types'
import {
	APPEND_NEW_SERVICE,
	CREATE_ECOSYSTEM_SUCCESS,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM
} from './action-types'

const initialState = {
	items: [],
	currentEcosystem: Cookie.get('currentEcosystem')
		? JSON.parse(Cookie.get('currentEcosystem'))
		: null,
	dictionaries: {
		services: [
			{
				id: 0,
				name: 'HTTP',
				description: '123123',
				port: '80',
				protocol: 'TCP'
			},
			{
				id: 1,
				name: 'HTTPS',
				description: '123123',
				port: '443',
				protocol: 'TCP'
			}
		]
	}
}

export function ecosystemsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_ECOSYSTEMS_SUCCESS: {
			return {
				...state,
				items: sortBy(payload, eco => eco.name)
			}
		}
		case CREATE_ECOSYSTEM_SUCCESS: {
			return {
				...state,
				items: sortBy([payload, ...state.items], eco => eco.name)
			}
		}
		case SET_CURRENT_ECOSYSTEM: {
			return {
				...state,
				currentEcosystem: payload
			}
		}
		case APPEND_NEW_SERVICE: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					services: [...state.dictionaries.services, payload.service]
				}
			}
		}
		case CLEAR_DATA: {
			Cookie.remove('currentEcosystem')
			return initialState
		}
		default:
			return state
	}
}
