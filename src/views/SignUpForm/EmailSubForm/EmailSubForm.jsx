import Spinner from 'react-spinner-material'
// import { Panel } from 'react-bootstrap'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import { emailValidationSchema } from '../../../utils/validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'

import { registerEmail } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import { errorSelector, isLoadingSelector } from '../../../store/user/selectors'
import '../sign-up-form.scss'

class EmailSubForm extends Component {
	state = {
		showError: false
	}

	static getDerivedStateFromProps({ serverError }) {
		if (serverError) return { showError: true }
		return null
	}

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
		registerEmail: func.isRequired,
		serverError: string.isRequired,
		clearError: func.isRequired,
		isLoading: bool.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up'
	}

	resetError = () => {
		const { serverError, clearError } = this.props
		serverError && clearError()
	}

	disableError = () => {
		this.setState({
			showError: false
		})
	}

	onSubmit = event => {
		event.preventDefault()
		const { isValid, registerEmail, values, serverError } = this.props
		if (isValid !== true || serverError) {
			this.setState({
				showError: true
			})
		} else {
			registerEmail(values.email)
		}
	}

	handleInputChange = event => {
		const { handleChange } = this.props
		this.setState({
			showError: false
		})
		handleChange(event)
	}

	render() {
		const {
			buttonTitle,
			values,
			setFieldTouched,
			isLoading,
			errors,
			serverError
		} = this.props
		const { showError } = this.state
		const error = errors.email || serverError
		const shouldErrorBeDisplayed = showError && error
		console.log(
			'EMAIL_ERROR',
			errors.email,
			'SERVER_ERROR',
			serverError,
			'JUST_ERROR',
			error,
			'SHOULD_ERROR_BE_DISPLAYED',
			shouldErrorBeDisplayed
		)
		return (
			<form onSubmit={this.onSubmit} className={'form-container'}>
				{shouldErrorBeDisplayed && (
					<ErrorPanel message={error} buttonClickHandler={this.disableError} />
				)}
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
						onFocus={this.resetError}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('email')}
					/>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<input type="submit" className="login-button" value={buttonTitle} />
				)}
				<div>
					<span />
				</div>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	serverError: errorSelector(state),
	isLoading: isLoadingSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			registerEmail,
			clearError
		},
		dispatch
	)

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withFormik({
		mapPropsToValues: () => ({
			email: ''
		}),
		validationSchema: emailValidationSchema
	})
)(EmailSubForm)
