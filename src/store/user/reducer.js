import { assign } from 'lodash'
import { handleActions } from 'redux-actions'

import {
	SET_USER,
	SET_EMAIL,
	START_LOADING,
	FINISH_LOADING,
	SET_ERROR,
	CLEAR_ERROR,
	SET_TOKEN,
	CONFIRM_EMAIL
} from './actionTypes'

const initialState = {
	email: '',
	uuid: '',
	firstName: '',
	lastName: '',
	isEmailConfirmed: false,
	isLoading: false,
	error: ''
}

export const userReducer = handleActions(
	{
		[SET_USER]: (state, { payload }) => assign({}, state, payload),
		[SET_EMAIL]: (state, { payload: email }) => assign({}, state, { email }),
		[START_LOADING]: state => assign({}, state, { isLoading: true }),
		[FINISH_LOADING]: state => assign({}, state, { isLoading: false }),
		[SET_ERROR]: (state, { payload: error }) => assign({}, state, { error }),
		[CLEAR_ERROR]: state => assign({}, state, { error: '' }),
		[SET_TOKEN]: (state, { payload }) => assign({}, state, { token: payload }),
		[CONFIRM_EMAIL]: state => assign({}, state, { isEmailConfirmed: true })
	},
	initialState
)
