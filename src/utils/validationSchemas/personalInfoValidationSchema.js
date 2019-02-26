import { object, string } from 'yup'

const emailValidationSchema = object({
	firstName: string('Enter your first name')
		.min(2)
		.required('First name is required'),
	lastName: string('Enter your last name')
		.min(2)
		.required('Last name is required')
})

export default emailValidationSchema
