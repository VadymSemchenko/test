import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import humps from 'humps'
import ecosystemsExampleData from './mocks/fetch_ecosystems'
import { list, newOne } from './mocks/fetch_objects'
import { policiesList, newService } from './mocks/fetch_policies'

const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	transformResponse: [
		data => {
			return humps.camelizeKeys(data)
		}
	]
})

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
		.onPost('/auth/login', {
			email: 'correct@acreto.io',
			password: 'qweqweqwe'
		})
		.reply(200, {
			accessToken: '123123-31321312-12312313'
		})
		.onPost('/auth/login')
		.reply(400, {})
		.onAny()
		.reply(400)
}

export function fetchEcosystems() {
	return rest.get('/ecosystems').then(response => response.data)
}

export function fetchObjects({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem}/objects`)
		.then(response => response.data)
}

export function fetchPolicies({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem}/policies`)
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
		.post(`/ecosystems/${ecosystem}/services`, service)
		.then(response => response.data)
}

export function createPolicy(policy, ecosystem) {
	return rest
		.post(`/ecosystems/${ecosystem}/policies`, policy)
		.then(response => response.data)
}

export function login(credentials) {
	return rest.post(`/auth/login`, credentials).then(response => response.data)
}

// TODO: it's mocked
function getUrlForType(type, ecosystem = '123ds-1231qwsdfsd-12eqadfgs') {
	return `/ecosystems/${ecosystem}/objects`
}
