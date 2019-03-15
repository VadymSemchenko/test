import { call, put, select } from 'redux-saga/effects'
import get from 'lodash/get'

import { setStripeError, setContractIdError } from '../payment/actions'
import { PAYMENT } from '../../constants/reducersNames'
import { STRIPE } from '../payment/propertiesNames'
import { startLoading, finishLoading } from '../user/actions'
import { createCustomer } from './apiCalls'
import history from '../../history'
import { logoutUser } from '../auth/actions'
import {
	extractResponseErrorStatus,
	createResponseErrorMessage
} from '../../utils/responseErrorHandler'

const stripeInSagaSelector = state => {
	const stripeInstance = get(state, [PAYMENT, STRIPE])
	return stripeInstance
}

export function* stripeSourceSaga({ payload: userData }) {
	yield put(startLoading())
	try {
		const responseAfterCallingStripeApi = yield call(
			createStripeSource,
			userData
		)
		const { source: userDataVerifiedByStripe } = responseAfterCallingStripeApi
		yield call(registerStripeSource, userDataVerifiedByStripe)
		yield call(finishRegistrationProcedure)
	} catch (error) {
		if (typeof error === 'string') {
			yield put(setStripeError(error))
		} else {
			const errorStatus = extractResponseErrorStatus(error)
			const errorMessage = createResponseErrorMessage({
				specificErrorHandler: {
					default: 'Error while generating Stripe Source Id'
				},
				status: errorStatus
			})
			yield put(setStripeError(errorMessage))
		}
	} finally {
		yield put(finishLoading())
	}
}

export function* createStripeSource(userData) {
	const stripe = yield select(stripeInSagaSelector)
	const response = yield stripe.createSource(userData)
	const { error } = response
	if (error) {
		const { message } = error
		throw message
	}
	return response
}

export function* registerStripeSource(userData) {
	//ATTENTION!! With payment_channel I specify,
	// if the Stripe Source Id or Contract Id is provided
	// as payment_ref
	const payment_channel = STRIPE
	const {
		id: payment_ref,
		owner: { name, address }
	} = userData
	try {
		const requestBody = {
			payment_channel,
			payment_ref,
			name,
			address
		}
		const response = yield call(createCustomer, requestBody)
		return response
	} catch (error) {
		const { field } = error
		if (field) {
			throw `Invalid Data Passed As "${field}"`
		}
	}
}
export function* contractIdSaga({ payload: companyData }) {
	yield put(startLoading())
	try {
		yield call(createCustomer, companyData)
		yield call(finishRegistrationProcedure)
	} catch (error) {
		const { field } = error
		const errorStatus = extractResponseErrorStatus(error)
		const errorMessage = field
			? `Invalid Data Passed As "${field}"`
			: createResponseErrorMessage({
					specificErrorHandler: {
						default: 'Error while generating Stripe Source Id'
					},
					status: errorStatus
			  })
		yield put(setContractIdError(errorMessage))
	} finally {
		yield put(finishLoading())
	}
}

export function* finishRegistrationProcedure() {
	yield put(logoutUser())
	history.push('/')
}
