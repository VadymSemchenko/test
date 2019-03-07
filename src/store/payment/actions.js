import { createAction } from 'redux-actions'

import {
	SET_STRIPE,
	CREATE_STRIPE_SOURCE,
	SET_STRIPE_ERROR,
	CLEAR_STRIPE_ERROR
} from './actionTypes'

export const setStripe = createAction(SET_STRIPE)
export const createStripeSource = createAction(CREATE_STRIPE_SOURCE)
export const setStripeError = createAction(SET_STRIPE_ERROR)
export const clearStripeError = createAction(CLEAR_STRIPE_ERROR)
