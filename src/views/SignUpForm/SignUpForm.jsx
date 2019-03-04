import { object } from 'prop-types'
import React, { Component } from 'react'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import findIndex from 'lodash/findIndex'

import Stepper from '../../components/Stepper/Stepper'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import BillingSubForm from './BillingInfoSubForm/BillingInfoSubForm'
import PersonalInfoSubForm from './PersonalInfoSubForm/PersonalInfoSubForm'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import EmailConfirmation from './EmailConfirmation/EmailConfirmation'
import EmailEntered from './EmailEntered/EmailEntered'
import './sign-up-form.scss'
import { extractLastValueFromPathname } from '../../utils/routeLocationParsers'

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
		return (
			<div className={'signup-form-page--content'}>
				{shouldStepsBeDisplayed && (
					<Stepper steps={this.steps} activeStepIndex={activeStepIndex} />
				)}
				<div className={'login-form'}>
					{shouldFormTitleBeDisplayed && (
						<div className="form-title-container">
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
