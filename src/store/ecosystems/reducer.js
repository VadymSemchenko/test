import Cookie from 'js-cookie'
import {
	APPEND_NEW_SERVICE,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM
} from './action-types'

const initialState = {
	items: [],
	currentEcosystem: Cookie.get('currentEcosystem'),
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
				items: payload
			}
		}
		case SET_CURRENT_ECOSYSTEM: {
			return {
				...state,
				currentEcosystem: payload.id
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
		default:
			return state
	}
}
