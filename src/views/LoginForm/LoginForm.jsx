import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../../assets/Icons'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import './login-form.scss'
import { login } from './scenario-actions'
import { clearError as clearLogoutError } from '../../store/user/actions'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import { errorSelector as logoutErrorSelector } from '../../store/user/selectors'

class LoginForm extends Component {
	state = {
		authError: 'You are not logged in!'
	}

	static getDerivedStateFromProps({ logoutError }) {
		if (logoutError) return { authError: logoutError }
		else return null
	}

	handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(e.target)
		const { from } = this.props.location.state || { from: { pathname: '/' } }

		const email = data.get('email')
		const password = data.get('password')
		this.props.login({ email, password }, from)
	}

	removeErrorMessage = () => {
		const { logoutError, clearLogoutError } = this.props
		logoutError ? clearLogoutError() : this.setState({ authError: '' })
	}

	render() {
		const { authError } = this.state
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<h2 className={'title'}>Log in</h2>
					{this.props.error && (
						<div className={'alert alert-danger'}>{this.props.error}</div>
					)}
					<form onSubmit={this.handleSubmit}>
						{authError && (
							<ErrorPanel
								message={authError}
								buttonClickHandler={this.removeErrorMessage}
							/>
						)}
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_EMAIL}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input name={'email'} placeholder={'Email'} required={true} />
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
								name={'password'}
								placeholder={'Password'}
								type={'password'}
								required={true}
							/>
						</div>
						<div className={'login-rememberme-container component-coming-soon'}>
							<label className={'checkbox-label wedge-checkbox-container'}>
								<input
									type="checkbox"
									checked={true}
									onChange={() => () => {}}
								/>
								<span className={'checkmark'} />
								<span className={'title'}>Remember me</span>
							</label>
							<p>Forgot your password?</p>
						</div>
						<input type="submit" className={'login-button'} value={'Log in'} />
					</form>
				</div>
			</div>
		)
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	clearLogoutError: PropTypes.func.isRequired,
	logoutError: PropTypes.string.isRequired
}

LoginForm.defaultProps = {
	error: '',
	isLoading: false
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state),
		logoutError: logoutErrorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (credentials, redirect) => dispatch(login(credentials, redirect)),
		clearLogoutError: () => dispatch(clearLogoutError())
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
export default withRouter(ConnectedLogin)
