import cx from 'classnames'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

import { emailValidationSchema } from '../../../utils/validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'

import { registerEmail } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import { errorSelector } from '../../../store/user/selectors'
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
		clearError: func.isRequired
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
			clearError
		} = this.props
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
						onFocus={clearError}
						onChange={handleChange}
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

const mapStateToProps = state => ({
	serverError: errorSelector(state)
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
