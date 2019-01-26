import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { ACRETO_LOGO, LOGIN_FOOTER } from '../../assets/Icons'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import CustomersForm from '../../views/CustomersForm/CustomersForm'
import LoginForm from '../../views/LoginForm/LoginForm'
import './login.scss'

class Login extends Component {
	render() {
		return (
			<div className="login-page">
				<div className={'login-page--header header'}>
					<img src={ACRETO_LOGO} alt={'acreto-logo'} className={'logo'} />
					<div className={'button component-coming-soon'}>Sign up</div>
				</div>

				<Switch>
					<Route exact path={'/auth/login'} render={LoginForm} />
					<ProtectedRoute path={'/auth/customers'} component={CustomersForm} />

					<Redirect to={'/auth/login'} />
				</Switch>

				<div className={'login-page--footer footer'}>
					<img src={LOGIN_FOOTER} className={'footer--image'} alt={'footer'} />
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired
}

export default withRouter(Login)
