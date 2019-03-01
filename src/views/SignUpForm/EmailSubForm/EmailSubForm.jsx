import Spinner from 'react-spinner-material'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'query-string'
import { withRouter } from 'react-router-dom'

import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import { emailValidationSchema } from '../../../utils/validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'
import { checkIfTheTokenIsValid } from '../scenario-actions'
import { registerEmail } from '../scenario-actions'
import {
	clearError
	// checkEmailConfirmationCode
} from '../../../store/user/actions'
import {
	errorSelector,
	isLoadingSelector,
	emailSelector
} from '../../../store/user/selectors'
import '../sign-up-form.scss'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'

class EmailSubForm extends Component {
	state = {
		showError: false,
		token: '',
		username: '',
		needsTokenCheck: true
	}

	constructor(props) {
		super(props)
		const {
			location: { search }
		} = props
		const { token, username } = qs.parse(search)
		this.username = username || ''
		this.token = token || ''
		console.log('USERNAME', this.username)
	}

	static getDerivedStateFromProps({ serverError }) {
		if (serverError) return { showError: true }
		return null
	}

	// componentDidUpdate() {
	// 	const { checkIfTheTokenIsValid } = this.props
	// 	const search = get(this.props, ['location', 'search'])
	// 	const { token, username } = qs.parse(search)
	// 	console.log('TOKEN', token, 'USERNAME', username)
	// 	localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, token)
	// 	// setToken(token)
	// 	checkIfTheTokenIsValid({ token, username })
	// }

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
		isLoading: bool.isRequired,
		location: object.isRequired,
		email: string.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up'
	}

	componentDidUpdate(prevProps, prevState) {
		const { checkIfTheTokenIsValid, serverError, isLoading } = prevProps
		const { needsTokenCheck } = prevState

		const shouldCheckToken =
			this.token &&
			this.username &&
			!serverError &&
			!isLoading &&
			needsTokenCheck
		console.log('SHOULD_CHECK_TOKEN', shouldCheckToken)
		if (shouldCheckToken) {
			console.log('I AM CHECKING')
			checkIfTheTokenIsValid({ token: this.token, username: this.username })
			this.setState(() => ({
				needsTokenCheck: false
			}))
		}
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
			email,
			serverError
		} = this.props
		const { showError } = this.state
		const error = errors.email || serverError
		const shouldErrorBeDisplayed = showError && error
		return (
			<form onSubmit={this.onSubmit} className={'form-container'}>
				{shouldErrorBeDisplayed && (
					<ErrorPanel message={error} buttonClickHandler={this.disableError} />
				)}
				{!email && (
					<>
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
						<>
							{isLoading ? (
								<Spinner spinnerColor="#4986c5" className="spinner" />
							) : (
								<input
									type="submit"
									className="signup-button"
									value={buttonTitle}
								/>
							)}
						</>
					</>
				)}
				{email && !this.username && (
					<SuccessPanel message="Confirmation link has been sent to your email" />
				)}
				{/* {email && this.username && (
					
				)} */}
				<div>
					<span />
				</div>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	serverError: errorSelector(state),
	isLoading: isLoadingSelector(state),
	error: errorSelector(state),
	email: emailSelector(state)
	// email: 'test@email.com'
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			registerEmail,
			clearError,
			checkIfTheTokenIsValid
		},
		dispatch
	)

export default compose(
	withRouter,
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
