import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	Col,
	Grid,
	Row,
	ButtonToolbar,
	DropdownButton,
	MenuItem
} from 'react-bootstrap'
import { withFormik } from 'formik'
import { func, number, object, string, bool } from 'prop-types'
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement
} from 'react-stripe-elements'
import Spinner from 'react-spinner-material'

import {
	CARD_HOLDER_NAME,
	STREET_ADDRESS,
	CITY_ADDRESS,
	ZIP_CODE,
	COUNTRY,
	STATE
} from '../../validationSchemas/stripeSourceRegistrationValidationSchema'
import countries from '../../constants/countriesNames'
import { stripeSourceRegistrationValidationSchema } from '../../validationSchemas'
import {
	createStripeSource,
	clearStripeError,
	setStripeError
} from '../../store/payment/actions'
import './stripe-souce-registration.css'
import { stripeErrorSelector } from '../../store/payment/selectors'
import ErrorPanel from '../ErrorPanel/ErrorPanel'
import { emailSelector, isLoadingSelector } from '../../store/user/selectors'

class StripeSourceRegistration extends Component {
	state = {
		shouldErrorBeDisplayed: false
	}

	handleInputChange = event => {
		event.persist()
		const { handleChange } = this.props
		this.cleanUpError()
		handleChange(event)
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({
			shouldErrorBeDisplayed: true
		})
		const { isValid, values, email, createStripeSource } = this.props
		if (!isValid) {
			return
		}
		createStripeSource({
			type: 'card',
			owner: {
				name: values[CARD_HOLDER_NAME],
				email,
				address: {
					city: values[CITY_ADDRESS],
					state: values[STATE],
					postal_code: values[ZIP_CODE],
					country: countries[values[COUNTRY]],
					line1: values[STREET_ADDRESS],
					line2: ''
				}
			}
		})
	}

	cleanUpError = () => {
		const { shouldErrorBeDisplayed } = this.state
		if (shouldErrorBeDisplayed === true) {
			this.setState(({ shouldErrorBeDisplayed }) => ({
				shouldErrorBeDisplayed: !shouldErrorBeDisplayed
			}))
		}
		const { stripeError, clearStripeError } = this.props
		if (stripeError) clearStripeError()
	}

	styleCustomFields = {
		fontSize: '18px',
		color: '#6d8994',
		'::-webkit-input-placeholder': {
			color: '#c5c8c9',
			fontStyle: 'normal'
		},
		'::placeholder': {
			color: '#c5c8c9',
			fontStyle: 'normal'
		}
	}

	handleBlur = ({ target: { name } }) => {
		const { setFieldTouched } = this.props
		setFieldTouched(name)
	}

	handleDropDownSelect = key => {
		const { setFieldValue } = this.props
		setFieldValue(COUNTRY, key)
	}

	render() {
		const {
			componentIndex,
			selectedIndex,
			handleChange,
			values,
			errors,
			stripeError,
			isLoading
		} = this.props
		const { shouldErrorBeDisplayed } = this.state
		if (componentIndex !== selectedIndex) return null
		return (
			<form onSubmit={this.handleSubmit} className="form-container-stripe">
				<Grid>
					{!!stripeError && (
						<Row>
							<Col xs={12} className="col">
								<ErrorPanel
									message={stripeError}
									buttonClickHandler={this.cleanUpError}
								/>
							</Col>
						</Row>
					)}
					{shouldErrorBeDisplayed &&
						Object.values(errors).map(error => (
							<Row key={error}>
								<Col xs={12} className="col">
									<ErrorPanel
										message={error}
										buttonClickHandler={this.cleanUpError}
									/>
								</Col>
							</Row>
						))}
					<Row>
						<Col xs={12} className="col">
							<label>
								<span className="labelForm">Card Number</span>
								<div onClick={this.cleanUpError}>
									<CardNumberElement
										className="inputField"
										style={{ base: this.styleCustomFields }}
										onFocus={this.cleanUpError}
									/>
								</div>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Card Holder</span>
								<input
									type="text"
									placeholder="Name on card"
									className="inputField"
									name={CARD_HOLDER_NAME}
									onChange={handleChange}
									onBlur={this.handleBlur}
								/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">CVV</span>
								<CardCVCElement
									className="inputField"
									style={{ base: this.styleCustomFields }}
									onFocus={this.cleanUpError}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Expiry Date</span>
								<CardExpiryElement
									className="inputField"
									style={{ base: this.styleCustomFields }}
									onFocus={this.cleanUpError}
								/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Street address</span>
								<input
									type="text"
									placeholder="Enter"
									className="inputField"
									onChange={handleChange}
									onBlur={this.handleBlur}
									name={STREET_ADDRESS}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Country</span>
								<ButtonToolbar className="inputFieldDropdownHolder">
									<DropdownButton
										title={countries[values[COUNTRY]]}
										id="dropdown-size-medium"
										className="inputFieldDropdown"
										key={values[COUNTRY]}
									>
										{countries.map((item, index) => {
											return (
												<MenuItem
													eventKey={index}
													onSelect={this.handleDropDownSelect}
													active={values[COUNTRY] === index}
													key={item}
												>
													{item}
												</MenuItem>
											)
										})}
									</DropdownButton>
								</ButtonToolbar>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">City</span>
								<input
									type="text"
									placeholder="Enter"
									className="inputField"
									onBlur={this.handleBlur}
									onChange={handleChange}
									name={CITY_ADDRESS}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">State</span>
								<input
									type="text"
									placeholder="Enter"
									className="inputField"
									onBlur={this.handleBlur}
									onChange={handleChange}
									name={STATE}
								/>
							</label>
						</Col>
						<Col xs={12} md={6} className="Col">
							<label>
								<span className="labelForm">Billing Zipcode</span>
								<input
									type="string"
									placeholder="Enter"
									className="inputField"
									onBlur={this.handleBlur}
									onChange={handleChange}
									name={ZIP_CODE}
									maxLength="5"
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12} className="submitHolder">
							{isLoading ? (
								<Spinner spinnerColor="#4986c5" />
							) : (
								<div className="submit-container">
									<input type="submit" value="Submit" />
								</div>
							)}
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
	stripe: object.isRequired,
	stripeError: string.isRequired,
	email: string.isRequired,
	values: object.isRequired,
	isValid: bool.isRequired,
	clearStripeError: func.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	errors: object.isRequired,
	setFieldValue: func.isRequired,
	isLoading: bool.isRequired
}

const mapStateToProps = state => ({
	stripeError: stripeErrorSelector(state),
	email: emailSelector(state),
	isLoading: isLoadingSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createStripeSource,
			clearStripeError,
			setStripeError
		},
		dispatch
	)

export default compose(
	injectStripe,
	withFormik({
		mapPropsToValues: () => ({
			[CARD_HOLDER_NAME]: '',
			[CITY_ADDRESS]: '',
			[STREET_ADDRESS]: '',
			[ZIP_CODE]: '',
			[COUNTRY]: 0
		}),
		validationSchema: stripeSourceRegistrationValidationSchema,
		displayName: 'stripeSourceRegistrationForm'
	}),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(StripeSourceRegistration)
