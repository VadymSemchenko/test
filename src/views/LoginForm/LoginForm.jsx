import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../../assets/Icons'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import './login-form.scss'
import { login } from './scenario-actions'

class LoginForm extends Component {
	componentDidMount() {
		const { warning } = this.props.location.state || { warning: false }
		if (warning) {
			toast.error('You have been logged out!', {
				autoClose: false,
				hideProgressBar: true
			})
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(e.target)
		const { from } = this.props.location.state || { from: { pathname: '/' } }

		const email = data.get('email')
		const password = data.get('password')
		this.props.login({ email, password }, from)
	}

	render() {
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<h2 className={'title'}>Log in</h2>
					{this.props.error && (
						<div className={'alert alert-danger'}>{this.props.error}</div>
					)}
					<form onSubmit={this.handleSubmit}>
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_EMAIL}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input
								name={'email'}
								placeholder={'Email'}
								// type={'email'}
								required={true}
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
	location: PropTypes.object.isRequired
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
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (credentials, redirect) => dispatch(login(credentials, redirect))
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
export default withRouter(ConnectedLogin)
