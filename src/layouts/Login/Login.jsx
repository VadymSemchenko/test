import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { ACRETO_LOGO, LOGIN_FOOTER } from '../../assets/Icons'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
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
