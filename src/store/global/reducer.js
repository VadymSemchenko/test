import { FINISH_STARTUP } from './action-types'
const initialState = {
	startupFinished: false
}

export function globalReducer(state = initialState, { type }) {
	switch (type) {
		case FINISH_STARTUP:
			return {
				startupFinished: true
			}
		default:
			return state
	}
}
