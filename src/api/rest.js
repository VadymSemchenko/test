import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import humps from 'humps'
import { LOCAL_ACCESS_TOKEN_KEY } from '../enums'
import store from '../store'
import { logoutUser, renewToken } from '../store/auth/actions'
import { list, newOne } from './mocks/fetch_objects'
import { newService, policiesList } from './mocks/fetch_policies'

export const auth = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

export const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	transformResponse: [
		...axios.defaults.transformResponse,
		data => humps.camelizeKeys(data)
	]
})

rest.interceptors.request.use(
	config => {
		const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

		if (token === null) {
			store.dispatch(logoutUser())
			return config
		}
		config.headers.Authorization = `Bearer ${token}`

		return config
	},
	err => Promise.reject(err)
)

rest.interceptors.response.use(
	response => {
		store.dispatch(renewToken())
		return response
	},
	error => {
		if (error.status === 401) {
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			store.dispatch(logoutUser())
		}
		return Promise.reject(error)
	}
)

if (process.env.REACT_APP_ENABLE_MOCK === 'true') {
	const readUserMockReponse = require('./mocks/read_user')
	const createUserMockReponse = require('./mocks/create_user')
	const fulfillUserMockResponse = require('./mocks/fulfill_user')
	const restMock = new MockAdapter(rest, { delayResponse: 300 })
	restMock
		.onGet('/ecosystems/00790f55-a0a5-f4a4-6041-f291324f89a1/objects')
		.reply(200, list)
		.onGet('/ecosystems/d8a3f3eb-9aa4-0f10-49fc-717792090847/policies')
		.reply(200, policiesList)
		.onPost('/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/policies')
		.reply(200, {})
		.onPost('/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/services')
		.reply(201, newService)
		.onPost('/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/objects')
		.reply(201, newOne)
		.onPut(
			'/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/objects/2ewsvw234ewrdsf'
		)
		.reply(400)
		.onGet(new RegExp('/v2/users/*'))
		.reply(readUserMockReponse)
		.onPut(new RegExp('/v2/users/*'))
		.reply(fulfillUserMockResponse)
		.onAny()
		.passThrough()

	const authMock = new MockAdapter(auth, { delayResponse: 300 })
	authMock.onPost(`v2/users`).reply(createUserMockReponse)
}

export function fetchEcosystems({ customer }) {
	// Quick-Fix
	if (!customer) return
	//
	return rest
		.get(`/v2/customers/${customer}/ecosystems`)
		.then(response => response.data)
}

export function createEcosystem({ customer, entity }) {
	return rest
		.post(`/v2/customers/${customer}/ecosystems`, {
			name: entity.name,
			nsps: ['EWR1']
		})
		.then(response => response.data)
}

export function fetchObjects({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem.uuid}/objects`)
		.then(response => response.data)
}

export function fetchPolicies({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem.uuid}/policies`)
		.then(response => response.data)
}

export function fetchGroups({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.id}/ecosystems/${ecosystem.uuid}/groups`)
		.then(response => response.data)
}

export function createGroup({ customer, ecosystem, name }) {
	return rest
		.post(`/v2/customers/${customer.id}/ecosystems/${ecosystem.uuid}/groups`, {
			name
		})
		.then(response => response.data)
}

export function createObject(object, type) {
	return rest.post(getUrlForType(type), object).then(response => response.data)
}

export function updateObject(object) {
	return rest.put(`${getUrlForType(object.element)}/${object.id}`, object)
}

export function createService(service, ecosystem) {
	return rest
		.post(`/ecosystems/${ecosystem.uuid}/services`, service)
		.then(response => response.data)
}

export function createPolicy(policy, ecosystem) {
	return rest
		.post(`/ecosystems/${ecosystem.uuid}/policies`, policy)
		.then(response => response.data)
}

export function login(credentials) {
	return auth.post(`v2/auth/login`, credentials).then(response => response.data)
}

export function logout() {
	return rest.post(`/v2/auth/logout`, {}).then(response => response.data)
}

export async function fetchReports({ query, ecosystem, customer }) {
	const hits = await rest
		.post(
			`/v2/customers/${customer}/ecosystems/${ecosystem}/logs/_search`,
			query
		)
		.then(response => {
			return response.data.hits.hits
		})
	return hits
		.map(report => ({ ...report.source, id: report.id }))
		.map(report => {
			return {
				id: report.id,
				date: report.eventDatetime,
				policy: report.policyID,
				source: report.sourceGeography,
				service: {
					protocol: '',
					port: report.destinationPort,
					tcp: 'UDP',
					status: ''
				},
				application: '',
				destination: report.destinationGeography,
				actions: [report.eventAction],
				alert: 'Threat',
				status: 'active'
			}
		})
}

// TODO: it's mocked
function getUrlForType(
	type,
	ecosystem = 'e6960bd4-2275-4d55-a1e7-a9101e79ba36'
) {
	return `/ecosystems/${ecosystem}/objects`
}
