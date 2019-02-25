// import { set } from 'lodash/fp'
import { assign } from 'lodash'
import { handleActions } from 'redux-actions'

import {
	SET_USER,
	SET_EMAIL,
	START_LOADING,
	FINISH_LOADING,
	SET_ERROR,
	CLEAR_ERROR
} from './actionTypes'

const initialState = {
	email: '',
	uuid: '',
	firstName: '',
	lastName: '',
	activated: false,
	isLoading: false,
	error: ''
}

// export const userReducer = (state = initialState, { type, payload }) => {
// 	switch (type) {
// 		case SET_USER:
// 			return payload
// 		case SET_EMAIL:
// 			return set('email', payload, state)
// 		case START_LOADING:
// 			return set('isLoading', true, state)
// 		case FINISH_LOADING:
// 			return set('isLoading', false, state)
// 		case SET_ERROR:
// 			return set('error', payload, state)
// 		case CLEAR_ERROR:
// 			return set('error', '', state)
// 		default:
// 			return state
// 	}
// }

export const userReducer = handleActions(
	{
		[SET_USER]: (_, { payload }) => payload,
		[SET_EMAIL]: (state, { payload: email }) => assign({}, state, { email }),
		[START_LOADING]: state => assign({}, state, { isLoading: true }),
		[FINISH_LOADING]: state => assign({}, state, { isLoading: true }),
		[SET_ERROR]: (state, { payload: error }) => assign({}, state, { error }),
		[CLEAR_ERROR]: state => assign({}, state, { error: '' })
	},
	initialState
)
