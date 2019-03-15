import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect, Route, Switch, withRouter, Link } from 'react-router-dom'
import { ACRETO_LOGO, LOGIN_FOOTER } from '../../assets/Icons'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import CustomersForm from '../../views/CustomersForm/CustomersForm'
import LoginForm from '../../views/LoginForm/LoginForm'
import SignUpForm from '../../views/SignUpForm/SignUpForm'
import './login.scss'

class Login extends Component {
	configs = {
		signup: {
			linkRoute: '/auth/sign-up/email',
			formTitle: 'Sign Up',
			authButtonTitle: 'Sign Up'
		},
		login: {
			linkRoute: '/auth/login',
			formTitle: 'Log In',
			authButtonTitle: 'Log In'
		}
	}
	render() {
		const {
			location: { pathname }
		} = this.props
		const currentConfig = pathname.includes(this.configs.signup.linkRoute)
			? this.configs.login
			: this.configs.signup
		const { linkRoute, formTitle, authButtonTitle } = currentConfig

		return (
			<div className="login-page">
				<div className={'login-page--header header'}>
					<img src={ACRETO_LOGO} alt={'acreto-logo'} className={'logo'} />
					<Link to={linkRoute} className={'button'}>
						{authButtonTitle}
					</Link>
				</div>

				<Switch>
					<Route exact path={'/auth/login'} render={LoginForm} />
					<ProtectedRoute path={'/auth/customers'} component={CustomersForm} />
					<UnauthorizedRoute
						path={'/auth/sign-up'}
						component={SignUpForm}
						formTitle={formTitle}
					/>
					<Redirect to={'/auth/login'} />
				</Switch>

				<div className={'login-page--footer footer'}>
					<img
						src={LOGIN_FOOTER}
						className={cx({
							'footer--image': true,
							'slow-shake': this.props.isLoading
						})}
						alt={'footer'}
					/>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	null
)(Login)

export default withRouter(ConnectedLogin)
