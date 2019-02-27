import cx from 'classnames'
import Spinner from 'react-spinner-material'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import debounce from 'lodash/debounce'

import { emailValidationSchema } from '../../../utils/validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'

import { registerEmail } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import { errorSelector, isLoadingSelector } from '../../../store/user/selectors'
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
		registerEmail: func.isRequired,
		serverError: string.isRequired,
		clearError: func.isRequired,
		isLoading: bool.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up'
	}

	componentDidUpdate(prevProps) {
		if (this.props.serverError !== prevProps.serverError) {
			toast.error(this.props.serverError, {
				hideProgressBar: true,
				autoClose: this.debounceTime
			})
		}
	}

	debounceTime = 1000

	toastError = () => {
		const { errors, serverError } = this.props
		toast.error(errors.email || serverError, {
			hideProgressBar: true,
			autoClose: this.debounceTime
		})
	}

	resetError = () => {
		const { serverError, clearError } = this.props
		serverError && clearError()
	}

	onSubmit = event => {
		event.preventDefault()
		const { isValid, registerEmail, values, serverError } = this.props
		const debouncedError = debounce(this.toastError, this.debounceTime, {
			leading: true
		})
		if (isValid !== true || serverError) {
			debouncedError()
		} else {
			registerEmail(values.email)
		}
	}

	render() {
		const {
			buttonTitle,
			values,
			isValid,
			setFieldTouched,
			handleChange,
			isLoading
		} = this.props
		return (
			<form onSubmit={this.onSubmit} className={'form-container'}>
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
						onChange={handleChange}
						onBlur={() => setFieldTouched('email')}
					/>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<input
						type="submit"
						className={cx({
							'login-button': true,
							invalid: !isValid
						})}
						value={buttonTitle}
					/>
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
