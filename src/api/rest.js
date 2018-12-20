import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ecosystemsExampleData from './mocks/fetch_ecosystems'
import objectsExampleData from './mocks/fetch_objects'

const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

if (process.env.REACT_APP_ENABLE_MOCK) {
	const mock = new MockAdapter(rest)
	mock.onGet('/ecosystems').reply(200, ecosystemsExampleData)
	mock
		.onGet('/ecosystems/123ds-1231qwsdfsd-12eqadfgs/objects')
		.reply(200, objectsExampleData)
}

export function fetchEcosystems() {
	return rest.get('/ecosystems').then(response => response.data)
}

export function fetchObjects({ ecosystem }) {
	return rest
		.get(`/ecosystems/${ecosystem}/objects`)
		.then(response => response.data)
}
