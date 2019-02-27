import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import Stepper from 'react-stepper-horizontal'
import get from 'lodash/get'

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
		stepIndex: 0
	}
	static getDerivedStateFromProps({ email }) {
		if (email) return { stepIndex: 1 }
		return null
	}

	stepper = {
		steps: [
			{
				title: 'SIGNUP'
			},
			{
				title: 'PERSONAL INFORMATION'
			},
			{
				title: 'BILLING'
			}
		],
		circleSize: 50,
		titleOffset: 20,
		fontSize: 16,
		numberSize: 20,
		circleBorderWidth: 2,
		titleUponCircles: true,
		setDisabledSteps: ({ length }, activeIndex) => {
			const result = []
			const setStep = index => {
				if (index < length) {
					result.push(index)
					setStep(++index)
				} else {
					return
				}
			}
			setStep(++activeIndex)
			return result
		},
		activeColor: '#4986c5',
		completeColor: '#B7B7B7',
		disabledColor: '#F9F9F9',
		numberColor: '#FFFFFF'
	}

	render() {
		const { formTitle, email } = this.props
		const isEmailSubmitted = !!email
		const { stepIndex } = this.state
		const {
			steps,
			circleSize,
			titleUponCircles,
			titleOffset,
			setDisabledSteps,
			activeColor,
			numberSize,
			completeColor,
			numberColor
		} = this.stepper
		const fontSize = get(this.stepper, ['fontSize'], 16)
		const circleBorderWidth = get(this.stepper, ['circleBorderWidth'], 3)
		const titleTop = titleUponCircles
			? -(circleSize + titleOffset + fontSize)
			: titleOffset
		const circleTop = titleUponCircles ? fontSize + titleOffset : 0
		const stepperContainerHeight = `${circleSize +
			titleOffset +
			fontSize +
			circleBorderWidth * 2}px`
		const disabledSteps = setDisabledSteps(steps, stepIndex)
		return (
			<div className={'login-form-page--content'}>
				<div
					className="stepper-container"
					style={{
						height: stepperContainerHeight
					}}
				>
					<Stepper
						steps={steps}
						activeStep={stepIndex}
						size={circleSize}
						titleTop={titleTop}
						circleFontSize={numberSize}
						titleFontSize={fontSize}
						circleTop={circleTop}
						disabledSteps={disabledSteps}
						defaultBarColor={activeColor}
						completeBarColor={completeColor}
						activeTitleColor={activeColor}
						completeTitleColor={completeColor}
						defaultTitleColor={completeColor}
						activeColor={activeColor}
						activeBorderColor={activeColor}
						completeColor={completeColor}
						completeBorderColor={completeColor}
						defaultColor={completeColor}
						defaultBorderColor={activeColor}
						circleFontColor={numberColor}
						defaultBorderStyle="solid"
						defaultBorderWidth={1}
					/>
				</div>
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
// const mapStateToProps = state => ({ email: 'test@e.mail' })

export default compose(
	connect(mapStateToProps),
	withRouter
)(SignUpForm)
