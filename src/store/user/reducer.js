import {
	SET_USER,
	SET_EMAIL,
	START_LOADING,
	FINISH_LOADING,
	SET_ERROR,
	CLEAR_ERROR
} from './actionTypes'
import { set } from 'lodash/fp'

const initialState = {
	email: '',
	uuid: '',
	firstName: '',
	lastName: '',
	activated: false,
	isLoading: false,
	error: ''
}

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			return payload
		case SET_EMAIL:
			return set('email', payload, state)
		case START_LOADING:
			return set('isLoading', true, state)
		case FINISH_LOADING:
			return set('isLoading', false, state)
		case SET_ERROR:
			return set('error', payload, state)
		case CLEAR_ERROR:
			return set('error', '', state)
		default:
			return state
	}
}
