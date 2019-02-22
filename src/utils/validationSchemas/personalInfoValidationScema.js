import { object, string } from 'yup'

const emailValidationSchema = object({
	firstName: string('Enter your first name').required('First name is required'),
	lastName: string('Enter your last name').required('Last name is required'),
	firstPassword: string('Enter password').required('Password is required'),
	secondPassword: string('Enter password').required('Password is required')
})

export default emailValidationSchema
