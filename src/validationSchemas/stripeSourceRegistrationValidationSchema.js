import { object, string } from 'yup'

export const CARD_HOLDER_NAME = 'cardHolderName'
export const STREET_ADDRESS = 'streetAddress'
export const CITY_ADDRESS = 'cityAddress'
export const ZIP_CODE = 'zipCode'
export const STATE = 'state'
export const COUNTRY = 'country'

const personalInfoValidationSchema = object({
	[CARD_HOLDER_NAME]: string('Card Holder')
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
	[ZIP_CODE]: string('ZIP').matches(/^[0-9]{5}/),
	[STATE]: string('State')
		.min(3)
		.max(100)
		.required('State Is Required Field')
})

export default personalInfoValidationSchema
