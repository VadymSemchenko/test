import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ecosystemsExampleData from './mocks/fetch_ecosystems'

const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

if (process.env.REACT_APP_ENABLE_MOCK) {
	const mock = new MockAdapter(rest)
	mock.onGet('/ecosystems').reply(200, ecosystemsExampleData)
}

export function fetchEcosystems() {
	return rest.get('/ecosystems').then(response => response.data)
}
