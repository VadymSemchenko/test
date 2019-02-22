import cx from 'classnames'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { emailValidationSchema } from '../../../utils/validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'
import '../sign-up-form.scss'

class EmailSubForm extends Component {
	static propTypes = {
		buttonTitle: string,
		handleSubmit: func.isRequired,
		values: shape({
			email: string
		}).isRequired,
		errors: shape({
			email: string
		}),
		isValid: bool.isRequired,
		setFieldTouched: func.isRequired,
		handleChange: func.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up'
	}

	onSubmit = event => {
		event.preventDefault()
		const { isValid, handleSubmit } = this.props
		const debounceTime = 1000
		const checkAndSubmit = () => {
			if (isValid !== true) {
				toast.error(this.props.errors.email, {
					hideProgressBar: true,
					autoClose: debounceTime
				})
			} else {
				handleSubmit()
			}
		}
		_.debounce(checkAndSubmit, 1000)()
	}

	handleInputChange = event => {
		const { handleChange } = this.props
		handleChange(event)
	}

	render() {
		const { buttonTitle, values, isValid, setFieldTouched } = this.props
		return (
			<form onSubmit={this.onSubmit}>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_EMAIL}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.email}
						name={'email'}
						placeholder={'Email'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('email')}
					/>
				</div>
				<input
					type="submit"
					className={cx({
						'login-button': true,
						invalid: !isValid
					})}
					value={buttonTitle}
				/>
				<div>
					<span />
				</div>
			</form>
		)
	}
}

export default compose(
	withFormik({
		mapPropsToValues: () => ({
			email: ''
		}),
		handleSubmit: values => console.log('FORMIK SUBMIT EVENT', values),
		validationSchema: emailValidationSchema
	})
)(EmailSubForm)
