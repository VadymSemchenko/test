import cx from 'classnames'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { personalInfoValidationScema } from '../../../utils/validationSchemas'
import { LOGIN_PASSWORD } from '../../../assets/Icons'
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
		handleChange: func.isRequired,
		email: string.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up'
	}

	onSubmit = event => {
		event.preventDefault()
		const { isValid, handleSubmit, errors } = this.props
		const debounceTime = 1000
		const checkAndSubmit = () => {
			if (isValid !== true) {
				Object.values(errors).forEach(message => {
					toast.error(message, {
						hideProgressBar: true,
						autoClose: debounceTime
					})
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
		const { buttonTitle, values, isValid, setFieldTouched, email } = this.props
		return (
			<form onSubmit={this.onSubmit}>
				<div className="input-container">
					<span> Your email has been successfully verified</span>
				</div>
				<div className="input-container">
					<span>{email}</span>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.firstName}
						name={'firstName'}
						placeholder={'Your first name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('firstName')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.lastName}
						name={'lastName'}
						placeholder={'Your last name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('lastName')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.firstPassword}
						name={'firstPassword'}
						placeholder={'Your password'}
						required={true}
						type="password"
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('firstPassword')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.secondPassword}
						name={'secondPassword'}
						placeholder={'Confirm your password'}
						required={true}
						type="password"
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('secondPassword')}
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
			firstName: '',
			lastName: '',
			firstPassword: '',
			secondPassword: ''
		}),
		handleSubmit: values => console.log('FORMIK SUBMIT EVENT', values),
		validationSchema: personalInfoValidationScema
	})
)(EmailSubForm)
