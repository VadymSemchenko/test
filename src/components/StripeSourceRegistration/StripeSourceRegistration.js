import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	// CardElement,
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement
} from 'react-stripe-elements'
// import { Grid, Row, Col, Button } from 'react-bootstrap'
import { func, number, object } from 'prop-types'

import { createStripeSource } from '../../store/payment/actions'

class StripeSourceRegistration extends Component {
	// handleSubmit = () => {
	// 	const { stripe } = this.props
	// 	stripe
	// 		.createSource({
	// 			type: 'card',
	// 			owner: {
	// 				name: 'Hello World',
	// 				email: 'test@a.a'
	// 			}
	// 		})
	// 		.then(response => console.log('RESPONSE', response))
	// 		.catch(error => console.log('ERROR', error))
	// }

	render() {
		const { componentIndex, selectedIndex } = this.props
		// console.log('COMPONENT INDEX', componentIndex)
		// console.log('SELECTED INDEX', selectedIndex)
		// console.log('SHOULD RENDER STRIPE', componentIndex === selectedIndex)
		// console.log('THIS.PROPS.STRIPE', this.props.stripe)
		if (componentIndex !== selectedIndex) return null
		return (
			<form onSubmit={this.handleSubmit} className="form-container">
				<CardNumberElement />
				<CardExpiryElement />
				<CardCVCElement />
			</form>
		)
	}
}

StripeSourceRegistration.propTypes = {
	createStripeSource: func.isRequired,
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired,
	stripe: object.isRequired
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createStripeSource
		},
		dispatch
	)

export default compose(
	injectStripe,
	connect(
		null,
		mapDispatchToProps
	)
)(StripeSourceRegistration)
