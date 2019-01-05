import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import humps from 'humps'
import ecosystemsExampleData from './mocks/fetch_ecosystems'
import { list, newOne } from './mocks/fetch_objects'

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
		.onPost('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects')
		.reply(201, newOne)
		.onPut('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects/2ewsvw234ewrdsf')
		.reply(400)
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

export function createObject(object, type) {
	return rest.post(getUrlForType(type), object).then(response => response.data)
}

export function updateObject(object) {
	return rest.put(`${getUrlForType(object.element)}/${object.id}`, object)
}

// TODO: it's mocked
function getUrlForType(type, ecosystem = '123ds-1231qwsdfsd-12eqadfgs') {
	return `/ecosystems/${ecosystem}/objects`
}
