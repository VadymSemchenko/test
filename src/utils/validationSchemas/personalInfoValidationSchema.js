import { object, string } from 'yup'

const personalInfoValidationSchema = object({
	fullName: string('Full name')
		.min(2, 'Full Name Should Contain At Least 2 Characters!')
		.max(100)
		.required('Full name is required')
})

export default personalInfoValidationSchema
