import { all, takeLatest } from 'redux-saga/effects'

import {
	CREATE_STRIPE_SOURCE,
	REGISTER_CONTRACT_ID
} from '../payment/actionTypes'

import { stripeSourceSaga, contractIdSaga } from './billingRegistrationSagas'

export default function* rootSaga() {
	yield all([
		takeLatest(CREATE_STRIPE_SOURCE, stripeSourceSaga),
		takeLatest(REGISTER_CONTRACT_ID, contractIdSaga)
	])
}
