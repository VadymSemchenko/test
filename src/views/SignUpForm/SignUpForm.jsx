import { string, bool } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import Stepper from '../../components/Stepper/Stepper'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import PersonalInfoSubForm from './PersonalInfoSubForm/PersonalInfoSubForm'
import { isActivatedSelector } from '../../store/user/selectors'
import './sign-up-form.scss'

class SignUpForm extends Component {
	state = {
		activeStepIndex: 0
	}
	static getDerivedStateFromProps({ isActivated }) {
		if (isActivated) return { activeStepIndex: 1 }
		return null
	}

	steps = [
		{
			title: 'SIGN UP'
		},
		{
			title: 'PERSONAL INFORMATION'
		},
		{
			title: 'BILLING'
		}
	]

	renderSubForm = () => {
		const { formTitle, isActivated } = this.props
		if (isActivated) {
			return <PersonalInfoSubForm />
		}
		return <EmailSubForm buttonTitle={formTitle} />
	}

	render() {
		const { formTitle } = this.props
		const { activeStepIndex } = this.state
		const shouldStepsBeDisplayed = activeStepIndex !== 0
		const shouldFormTitleBeDisplayed = !shouldStepsBeDisplayed
		return (
			<div className={'signup-form-page--content'}>
				{shouldStepsBeDisplayed && (
					<Stepper steps={this.steps} activeStepIndex={activeStepIndex} />
				)}
				<div className={'login-form'}>
					{shouldFormTitleBeDisplayed && (
						<div className="form-title-container">
							<h2 className={'title'}>{formTitle}</h2>
						</div>
					)}
					{this.renderSubForm()}
				</div>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	formTitle: string.isRequired,
	isActivated: bool.isRequired
}

SignUpForm.defaultProps = {
	formTitle: 'Sign Up'
}

const mapStateToProps = state => ({
	isActivated: isActivatedSelector(state)
})

export default compose(
	connect(mapStateToProps),
	withRouter
)(SignUpForm)
