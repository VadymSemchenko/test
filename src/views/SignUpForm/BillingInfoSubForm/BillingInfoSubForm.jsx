import React, { Component, createRef } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardElement } from 'react-stripe-elements'
import Button from 'react-bootstrap/lib/Button'
import { object } from 'prop-types'

import '../sign-up-form.scss'

class BillingSubForm extends Component {
	handleSubmit = () => {
		const { stripe } = this.props
		stripe
			.createSource({
				type: 'card',
				owner: {
					name: 'Hello World',
					email: 'test@a.a'
				}
			})
			.then(response => console.log('RESPONSE', response))
			.catch(error => console.log('ERROR', error))
	}

	billingForm = createRef()
	input = null
	cardRef = createRef()

	render() {
		return (
			<form onSubmit={this.onSubmit} className="form-container">
				<div>Billing Info Sub Form</div>
				<CardElement />
				<Button onClick={this.handleSubmit}>Submit</Button>
			</form>
		)
	}
}

BillingSubForm.propTypes = {
	stripe: object.isRequired
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default compose(
	injectStripe,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(BillingSubForm)
