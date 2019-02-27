import { createAction } from 'redux-actions'
import {
	SET_USER,
	SET_EMAIL,
	START_LOADING,
	FINISH_LOADING,
	SET_ERROR,
	CLEAR_ERROR,
	SET_TOKEN
} from './actionTypes'

export const setUser = createAction(SET_USER)
export const setEmail = createAction(SET_EMAIL)
export const startLoading = createAction(START_LOADING)
export const finishLoading = createAction(FINISH_LOADING)
export const setError = createAction(SET_ERROR)
export const clearError = createAction(CLEAR_ERROR)
export const setToken = createAction(SET_TOKEN)
