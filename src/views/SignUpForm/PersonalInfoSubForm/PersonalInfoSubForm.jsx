import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from 'react-spinner-material'

import { personalInfoValidationSchema } from '../../../utils/validationSchemas'
import { PERSON } from '../../../assets/Icons'
import { completeUser } from '../scenario-actions'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import { isLoadingSelector, errorSelector } from '../../../store/user/selectors'
import '../sign-up-form.scss'

class PersonalInfoSubForm extends Component {
	state = {
		showEmailVerificationMessage: true
	}

	static propTypes = {
		buttonTitle: string,
		values: shape({
			fullName: string
		}).isRequired,
		errors: shape({
			firstName: string,
			lastName: string
		}),
		isValid: bool.isRequired,
		setFieldTouched: func.isRequired,
		handleChange: func.isRequired,
		email: string.isRequired,
		isLoading: bool.isRequired,
		completeUser: func.isRequired,
		serverError: string.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up',
		isLoading: true
	}

	onSubmit = event => {
		event.preventDefault()
		const {
			isValid,
			values: { fullName },
			completeUser
		} = this.props
		if (isValid !== true) {
			this.setState({
				showError: true
			})
			return
		} else {
			completeUser({
				fullName
			})
		}
	}

	closeEmailVerificationMessage = () => {
		this.setState(() => ({
			showEmailVerificationMessage: false
		}))
	}

	handleInputChange = event => {
		const { handleChange } = this.props
		const { showEmailVerificationMessage, showError } = this.state
		showEmailVerificationMessage && this.closeEmailVerificationMessage()
		showError && this.closeErrorPanel()
		handleChange(event)
	}

	closeErrorPanel = () => {
		this.setState({
			showError: false
		})
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
		const { showEmailVerificationMessage, showError } = this.state
		return (
			<form onSubmit={this.onSubmit} className="form-container">
				{showEmailVerificationMessage && (
					<SuccessPanel
						message="Your email has been successfully verified"
						buttonClickHandler={this.closeEmailVerificationMessage}
					/>
				)}
				{showError && (
					<ErrorPanel
						message={errors.fullName || serverError}
						buttonClickHandler={this.closeErrorPanel}
					/>
				)}
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'person-icon'} alt={'person-icon'} />
					</div>
					<input
						value={values.name}
						name={'fullName'}
						placeholder={'Full Name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('fullName')}
					/>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<input type="submit" className="login-button" value={buttonTitle} />
				)}
			</form>
		)
	}
}

const mapStateToProps = state => ({
	isLoading: isLoadingSelector(state),
	serverError: errorSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			completeUser
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
			fullName: ''
		}),
		validationSchema: personalInfoValidationSchema
	})
)(PersonalInfoSubForm)
