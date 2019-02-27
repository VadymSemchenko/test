import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import cx from 'classnames'

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

	state = {
		activeStepIndex: 0
	}
	static getDerivedStateFromProps({ email }) {
		if (email) return { activeStepIndex: 1 }
		return null
	}

	steps = [
		{
			title: 'SIGNUP'
		},
		{
			title: 'PERSONAL INFORMATION'
		},
		{
			title: 'BILLING'
		}
	]

	renderSteps = () => {
		const { activeStepIndex } = this.state
		return (
			<>
				{this.steps.map(({ title }, index, stepsArray) => {
					const active = index === activeStepIndex
					const done = index < activeStepIndex
					const pending = index > activeStepIndex
					const last = stepsArray.length - index === 1
					return (
						<div key={title} className="single-step-container">
							<div
								className={cx('step-title', {
									active
								})}
							>
								{title}
							</div>
							<div
								className={cx('round-step-wrapper', {
									active,
									done,
									pending,
									last
								})}
							>
								<div
									className={cx('round-step', {
										active,
										done,
										pending,
										last
									})}
								>
									{++index}
								</div>
							</div>
						</div>
					)
				})}
			</>
		)
	}

	render() {
		const { formTitle, email } = this.props
		const isEmailSubmitted = !!email
		const { activeStepIndex } = this.state
		const shouldStepsBeDisplayed = activeStepIndex !== 0
		const shouldFormTitleBeDisplayed = !shouldStepsBeDisplayed
		return (
			<div className={'signup-form-page--content'}>
				<div className="stepper-container">
					{shouldStepsBeDisplayed && this.renderSteps()}
				</div>
				<div className={'login-form'}>
					{shouldFormTitleBeDisplayed && (
						<div className="form-title-container">
							<h2 className={'title'}>{formTitle}</h2>
						</div>
					)}
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
