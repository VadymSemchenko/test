import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from 'react-spinner-material'

import { personalInfoValidationSchema } from '../../../validationSchemas'
import { PERSON } from '../../../assets/Icons'
import { completeUser } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import EmailDisplay from '../../../components/EmailDisplay/EmailDisplay'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import {
	isLoadingSelector,
	errorSelector,
	emailSelector
} from '../../../store/user/selectors'
import '../sign-up-form.scss'

class PersonalInfoSubForm extends Component {
	state = {
		showEmailVerificationMessage: true,
		showError: true
	}

	componentDidUpdate(prevProps) {
		if (prevProps.serverError !== this.props.serverError) {
			this.setState({
				showError: true
			})
		}
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
		const { handleChange, clearError, serverError } = this.props
		if (serverError) clearError()
		const { showEmailVerificationMessage, showError } = this.state
		showEmailVerificationMessage && this.closeEmailVerificationMessage()
		showError && this.closeErrorPanel()
		handleChange(event)
	}

	closeErrorPanel = () => {
		const { clearError, serverError } = this.props
		if (serverError) clearError()
		this.setState({
			showError: false
		})
	}

	render() {
		const {
			values,
			setFieldTouched,
			isLoading,
			errors,
			serverError
		} = this.props
		const error = errors.fullName || serverError
		const { showEmailVerificationMessage, showError } = this.state
		const shouldErrorBeDisplayed = showError && error
		return (
			<form onSubmit={this.onSubmit} className="form-container">
				{showEmailVerificationMessage && (
					<>
						<SuccessPanel
							message="Your email has been successfully verified"
							buttonClickHandler={this.closeEmailVerificationMessage}
						/>
						<EmailDisplay />
					</>
				)}
				{shouldErrorBeDisplayed && (
					<ErrorPanel
						message={error}
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
					<input type="submit" className="signup-button" value="Next" />
				)}
			</form>
		)
	}
}

PersonalInfoSubForm.propTypes = {
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
	serverError: string.isRequired,
	clearError: func.isRequired
}

PersonalInfoSubForm.defaultProps = {
	buttonTitle: 'Sign Up',
	isLoading: true
}

const mapStateToProps = state => ({
	isLoading: isLoadingSelector(state),
	serverError: errorSelector(state),
	email: emailSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			completeUser,
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
			fullName: ''
		}),
		validationSchema: personalInfoValidationSchema
	})
)(PersonalInfoSubForm)
