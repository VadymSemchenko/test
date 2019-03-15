import { object, string, number } from 'yup'

export const COMPANY_NAME = 'companyName'
export const STREET_ADDRESS = 'streetAddress'
export const CITY_ADDRESS = 'cityAddress'
export const ZIP_CODE = 'zipCode'
export const STATE = 'state'
export const COUNTRY = 'country'
export const ACRETO_CONTRACT_ID = 'acretoContractId'

const personalInfoValidationSchema = object({
	[COMPANY_NAME]: string('Company Name')
		.min(2, 'Full Name Should Contain At Least 2 Characters!')
		.max(100)
		.required('Full name is required'),
	[STREET_ADDRESS]: string('Street Adress')
		.min(5, 'Address Should Contation At Least 5 Characters!')
		.max(100)
		.required('Street Address Is Required!'),
	[CITY_ADDRESS]: string('City')
		.min(2, 'City Name Should Contation At Least 3 Characters')
		.max(100)
		.required('City Address Is Required!'),
	[ZIP_CODE]: string('ZIP').test(
		'length',
		'Must be exactly 5 characters',
		({ length }) => length === 5
	),
	[STATE]: string('State')
		.min(3)
		.max(100)
		.required('State Is Required Field'),
	[ACRETO_CONTRACT_ID]: string('Acreto Contract Id').required(
		'Acreto Contract ID Is Required'
	),
	[COUNTRY]: number().required
})

export default personalInfoValidationSchema
