import { assign } from 'lodash'
import { handleActions } from 'redux-actions'

import { SET_STRIPE } from './actionTypes'

const initialState = {
	stripe: {}
}

const paymentReducer = handleActions(
	{
		[SET_STRIPE]: (state, { payload }) => assign({}, state, { stripe: payload })
	},
	initialState
)

export default paymentReducer
