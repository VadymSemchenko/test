import React, { Component } from 'react'
import { number } from 'prop-types'
import './pay-pal-registration.scss'
import { Col, Grid, Row } from 'react-bootstrap'
import {
	PAYPAL
} from '../../assets/Icons'

class PayPalRegistration extends Component {
	render() {
		const { selectedIndex, componentIndex } = this.props
		if (selectedIndex !== componentIndex) return null
		return (
			<div className="form-container-paypal-holder">
				<form onSubmit={this.handleSubmit} className="form-container-paypal">
					<Grid>
						<Row>
							<Col xs={12} md={12} className="col">
								<div className="visual">
									<img
										alt='utilization-chart'
										src={PAYPAL}
										className='chart'
									/>
								</div>
							</Col>
							<Col xs={12} md={12} className="col">
								<label>
									<input type="text" placeholder="Email our mobile number"  className="inputField"/>
								</label>
							</Col>
							<Col xs={12} md={12} className="col">
								<label>
									<input type="password" placeholder="Password"  className="inputField"/>
								</label>
							</Col>
							<Col xs={12} md={12} className="submitHolder">
								<input type="submit" value="Log In"/>
							</Col>
							<Col xs={12} md={12} className="submitHolder">
								<a href="#" className="HavingTrouble">Having trouble logging in?</a>
								<span className="Choose"> <span>or</span></span>
							</Col>
							<Col xs={12} md={12} className="submitHolder">
								<input type="submit" value="Sign Up" className="SignUp"/>
							</Col>
						</Row>
					</Grid>
				</form>
			</div>
		)
	}
}
PayPalRegistration.propTypes = {
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired
}

export default PayPalRegistration
