import { object, string, ref } from 'yup'

const emailValidationSchema = object({
	firstName: string('Enter your first name').required('First name is required'),
	lastName: string('Enter your last name').required('Last name is required'),
	password: string('Enter password').required('Password is required'),
	confirmPassword: string()
		.oneOf([ref('password'), null], 'Password do not match')
		.required('Password confirmation is required')
})

export default emailValidationSchema
