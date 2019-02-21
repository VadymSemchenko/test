import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import './sign-up-form.scss'
import { login } from './scenario-actions'

class LoginForm extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		error: PropTypes.string.isRequired,
		isLoading: PropTypes.bool.isRequired,
		location: PropTypes.object.isRequired,
		formTitle: PropTypes.string.isRequired
	}

	static defaultProps = {
		error: '',
		isLoading: false,
		formTitle: 'Sign Up'
	}

	render() {
		const { formTitle } = this.props
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<h2 className={'title'}>{formTitle}</h2>
					{this.props.error && (
						<div className={'alert alert-danger'}>{this.props.error}</div>
					)}
					<EmailSubForm buttonTitle={formTitle} />
				</div>
			</div>
		)
	}
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
