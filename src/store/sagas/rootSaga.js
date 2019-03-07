import { all, takeLatest } from 'redux-saga/effects'

import { CREATE_STRIPE_SOURCE } from '../payment/actionTypes'

import StripeSourceSaga from './registerStripeSourceSaga'

export default function* rootSaga() {
	yield all([takeLatest(CREATE_STRIPE_SOURCE, StripeSourceSaga)])
}
