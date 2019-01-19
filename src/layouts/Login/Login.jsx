import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { withRouter } from 'react-router-dom'
import {
	ACRETO_LOGO,
	LOGIN_EMAIL,
	LOGIN_FOOTER,
	LOGIN_PASSWORD
} from '../../assets/Icons'
import './login.scss'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import { login } from './scenario-actions'

class Login extends Component {
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
			<div className="login-page">
				<div className={'login-page--header header'}>
					<img src={ACRETO_LOGO} alt={'acreto-logo'} className={'logo'} />
					<div className={'button component-coming-soon'}>Sign up</div>
				</div>

				<div className={'login-page--content'}>
					<div className={'login-form'}>
						<h2 className={'title'}>Log in</h2>
						{this.props.error && (
							<div className={'alert alert-danger'}>{this.props.error}</div>
						)}
						<form onSubmit={this.handleSubmit}>
							<div className={'input-container'}>
								<div className={'icon-container'}>
									<img src={LOGIN_EMAIL} className={'input-icon'} />
								</div>
								<input
									name={'email'}
									placeholder={'Email'}
									type={'email'}
									required={true}
								/>
							</div>
							<div className={'input-container'}>
								<div className={'icon-container'}>
									<img src={LOGIN_PASSWORD} className={'input-icon'} />
								</div>
								<input
									name={'password'}
									placeholder={'Password'}
									type={'password'}
									required={true}
								/>
							</div>
							<input
								type="submit"
								className={'login-button'}
								value={'Log in'}
							/>
						</form>
					</div>
				</div>

				<div className={'login-page--footer footer'}>
					<img src={LOGIN_FOOTER} className={'footer--image'} />
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired
}

Login.defaultProps = {
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
)(Login)
export default withRouter(ConnectedLogin)
