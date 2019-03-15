import { object } from 'prop-types'
import React, { Component } from 'react'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import findIndex from 'lodash/findIndex'
import cx from 'classnames'

import Stepper from '../../components/Stepper/Stepper'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import BillingSubForm from './BillingInfoSubForm/BillingInfoSubForm'
import PersonalInfoSubForm from './PersonalInfoSubForm/PersonalInfoSubForm'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import EmailConfirmation from './EmailConfirmation/EmailConfirmation'
import EmailEntered from './EmailEntered/EmailEntered'
import { extractLastValueFromPathname } from '../../utils/routeLocationParsers'
import './sign-up-form.scss'

class SignUpForm extends Component {
	state = {
		stateStepIndex: 0
	}

	steps = [
		{
			title: 'SIGN UP',
			endpoint: '/email'
		},
		{
			title: 'PERSONAL INFORMATION',
			endpoint: '/personal-info'
		},
		{
			title: 'BILLING',
			endpoint: '/billing'
		}
	]

	basePath = '/auth/sign-up'

	render() {
		const { location } = this.props
		const endpoint = `/${extractLastValueFromPathname(location)}`
		const endpointStepIndex = findIndex(this.steps, step => {
			return step.endpoint === endpoint
		})
		const { stateStepIndex } = this.state
		const activeStepIndex =
			endpointStepIndex >= 0 ? endpointStepIndex : stateStepIndex
		const shouldStepsBeDisplayed = activeStepIndex !== 0
		const shouldFormTitleBeDisplayed = !shouldStepsBeDisplayed
		const isBillingForm = activeStepIndex === 2
		const loginFormWrapperClasses = cx({
			'sign-up-form': true,
			'payment-form': isBillingForm
		})
		return (
			<div className={'signup-form-page--content'}>
				{shouldStepsBeDisplayed && (
					<Stepper steps={this.steps} activeStepIndex={activeStepIndex} />
				)}
				<div className={loginFormWrapperClasses}>
					{shouldFormTitleBeDisplayed && (
						<div>
							<h2 className={'title'}>Sign Up</h2>
						</div>
					)}
					<Switch>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}${this.steps[1].endpoint}`}
							component={PersonalInfoSubForm}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}${this.steps[2].endpoint}`}
							component={BillingSubForm}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/email-confirmation`}
							component={EmailConfirmation}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/email-entered`}
							component={EmailEntered}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/billing`}
							component={BillingSubForm}
						/>
						<UnauthorizedRoute path={this.basePath} component={EmailSubForm} />
						<Redirect to={`${this.basePath}`} />
					</Switch>
				</div>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	location: object.isRequired
}

export default withRouter(SignUpForm)
