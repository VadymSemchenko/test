import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, Row, ButtonToolbar,DropdownButton, MenuItem} from 'react-bootstrap'


import {
	// CardElement,
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement
} from 'react-stripe-elements'
// import { Grid, Row, Col, Button } from 'react-bootstrap'
import { func, number, object } from 'prop-types'

import { createStripeSource } from '../../store/payment/actions'
import './stripe-souce-registration.css'

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

	styleCustomFields = {
		fontSize: '18px',
		color: '#6d8994',
		'::-webkit-input-placeholder': {
			color: '#c5c8c9',
			fontStyle:'normal',
		},
		'::placeholder': {
			color: '#c5c8c9',
			fontStyle:'normal',
		}
	}

	render() {
		const { componentIndex, selectedIndex } = this.props
		// console.log('COMPONENT INDEX', componentIndex)
		// console.log('SELECTED INDEX', selectedIndex)
		// console.log('SHOULD RENDER STRIPE', componentIndex === selectedIndex)
		// console.log('THIS.PROPS.STRIPE', this.props.stripe)
		if (componentIndex !== selectedIndex) return null
		return (
			<form onSubmit={this.handleSubmit} className="form-container-stripe">
				<Grid>
					<Row>
						<Col xs={12} md={12} className="col">
							<label>
								<span className="labelForm">Card Number</span>
								<CardNumberElement  className="inputField" style={{
									base:this.styleCustomFields
								}} />
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Card Holder</span>
								<input type="text" placeholder="Name on card"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">CVV</span>
								<CardCVCElement  className="inputField" style={{
									base : this.styleCustomFields
								}}/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Expiry Date</span>
								<CardExpiryElement  className="inputField" style={{
									base : this.styleCustomFields
								}}/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Street address</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Country</span>
								<ButtonToolbar className="inputFieldDropdownHolder">
									<DropdownButton title="United States" id="dropdown-size-medium"  className="inputFieldDropdown">
										<MenuItem eventKey="1">United States</MenuItem>
										<MenuItem eventKey="2">Canada</MenuItem>
										<MenuItem eventKey="3">Mexico</MenuItem>
									</DropdownButton>
								</ButtonToolbar>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">City</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">State</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="Col">
							<label>
								<span className="labelForm">Billing Zipcode</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={12} className="submitHolder">
							<input type="submit" value="Submit"/>
						</Col>
					</Row>
				</Grid>
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
