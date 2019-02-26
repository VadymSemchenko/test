import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import humps from 'humps'
import { LOCAL_ACCESS_TOKEN_KEY } from '../enums'
import store from '../store'
import { logoutUser, renewToken } from '../store/auth/actions'
import ecosystemsExampleData from './mocks/fetch_ecosystems'
import { list, newOne } from './mocks/fetch_objects'
import { newService, policiesList } from './mocks/fetch_policies'

const auth = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

const rest = axios.create({
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

if (process.env.REACT_APP_ENABLE_MOCK) {
	const mock = new MockAdapter(rest)
	mock
		.onGet('/ecosystems')
		.reply(200, ecosystemsExampleData)
		.onGet('/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/objects')
		.reply(200, list)
		.onGet('/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/policies')
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
		.onAny()
		.passThrough()
}

export function fetchEcosystems() {
	return rest.get('/ecosystems').then(response => response.data)
}

export function fetchObjects({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem.id}/objects`)
		.then(response => response.data)
}

export function fetchPolicies({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem.id}/policies`)
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
		.post(`/ecosystems/${ecosystem.id}/services`, service)
		.then(response => response.data)
}

export function createPolicy(policy, ecosystem) {
	return rest
		.post(`/ecosystems/${ecosystem.id}/policies`, policy)
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
	console.log({ hits })
	return hits
		.map(report => ({ ...report.source, id: report.id }))
		.map(report => {
			console.log({ report })
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

export const createUser = email => rest.post('/v2/users', { email })

export const loginUserForToken = email =>
	rest.post(`v2/auth/login`, { username: email, password: 'VeryLongDefP@SS' })

export const fulfillUser = ({ email, firstName, lastName }) => {
	const path = `/v2/users/${email}`
	// const requestPayload = omit(creds, ['uuid'])
	return rest.put(path, { email, firstName, lastName })
}

// TODO: it's mocked
function getUrlForType(
	type,
	ecosystem = 'e6960bd4-2275-4d55-a1e7-a9101e79ba36'
) {
	return `/ecosystems/${ecosystem}/objects`
}
