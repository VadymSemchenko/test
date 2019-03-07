import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, Row, ButtonToolbar,DropdownButton, MenuItem} from 'react-bootstrap'



// import { Grid, Row, Col, Button } from 'react-bootstrap'
import { number } from 'prop-types'

import { createStripeSource } from '../../store/payment/actions'
import './contract-id-registration.scss'

class ContractIdRegistration extends Component {



	render() {
		const { selectedIndex, componentIndex } = this.props
		if (selectedIndex !== componentIndex) return null
		return (
			<form className="form-container-contract">
				<Grid>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Legal company name</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Acreto contract</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Expiration date</span>
								<input type="text" placeholder="Enter"  className="inputField"/>
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
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Zipcode</span>
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
