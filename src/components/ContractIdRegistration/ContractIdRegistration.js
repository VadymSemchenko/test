import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import { Grid, Row, Col, Button } from 'react-bootstrap'
import { number } from 'prop-types'

import { createStripeSource } from '../../store/payment/actions'
import './contract-id-registration.scss'

class ContractIdRegistration extends Component {
	render() {
		const { selectedIndex, componentIndex } = this.props
		if (selectedIndex !== componentIndex) return null
		return (
			<form className="form-container">
				<div>contract id registration form</div>
			</form>
		)
	}
}

ContractIdRegistration.propTypes = {
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired
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
)(ContractIdRegistration)
