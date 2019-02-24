import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import 'react-toastify/dist/ReactToastify.css'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import PersonalInfoSubForm from './PersonalInfoSubForm/PersonalInfoSubForm'
import { emailSelector } from '../../store/user/selectors'
import './sign-up-form.scss'

class SignUpForm extends Component {
	static propTypes = {
		formTitle: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired
	}

	static defaultProps = {
		formTitle: 'Sign Up'
	}

	render() {
		const { formTitle, email } = this.props
		const isEmailSubmitted = !!email
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<h2 className={'title'}>{formTitle}</h2>
					{isEmailSubmitted ? (
						<PersonalInfoSubForm buttonTitle={formTitle} email={email} />
					) : (
						<EmailSubForm buttonTitle={formTitle} />
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({ email: emailSelector(state) })

export default compose(
	connect(mapStateToProps),
	withRouter
)(SignUpForm)
