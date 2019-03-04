import {
	extractDataFromConfig,
	randomResponseCreator
} from '../../utils/axiosMockHelpers'

const fulfillUserMockResponse = config => {
	console.log('FULFILL USER AXIOS COMFIG', config)
	const { email, fullName } = extractDataFromConfig(config)
	console.log(
		'FULLNAME FRON AXIOS CONFIG IN FULLFILL USER MOCK RESPONSE',
		fullName
	)
	console.log('EMAIL FRON AXIOS CONFIG IN FULLFILL USER MOCK RESPONSE', email)
	return randomResponseCreator({
		success: {
			code: 201,
			response: {
				uuid: 'awes0meuuid',
				email,
				isActivated: true,
				fullName
			}
		},
		failure: {
			code: 504,
			reponse: {}
		}
	})
}

export default fulfillUserMockResponse
