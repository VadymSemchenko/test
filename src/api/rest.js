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
		data => {
			return humps.camelizeKeys(data)
		}
	]
})

rest.interceptors.request.use(
	config => {
		const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

		if (token != null) {
			config.headers.Authorization = `Bearer ${token}`
		}

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
		.onGet('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects')
		.reply(200, list)
		.onGet('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/policies')
		.reply(200, policiesList)
		.onPost('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/policies')
		.reply(400, {})
		.onPost('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/services')
		.reply(201, newService)
		.onPost('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects')
		.reply(201, newOne)
		.onPut('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects/2ewsvw234ewrdsf')
		.reply(400)
		.onPost('/v2/auth/login')
		.passThrough()
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

// TODO: it's mocked
function getUrlForType(type, ecosystem = '123ds-1231qwsdfsd-12eqadfgs') {
	return `/ecosystems/${ecosystem}/objects`
}
