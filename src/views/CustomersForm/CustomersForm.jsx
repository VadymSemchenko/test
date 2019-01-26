import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './customers-form.scss'
import { BLUE_FORWARD_ARROW } from '../../assets/Icons'
import { useCustomer } from './scenario-actions'

class CustomersForm extends Component {
	handleSelectCustomer = customer => {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		this.props.useCustomer(customer, from)
	}

	render() {
		const length = this.props.customers.length
		return (
			<div className={'customers-form-page--content'}>
				<div className={'customers-form'}>
					<h2 className={'title'}>All customers</h2>
					<div className={'customers-container'}>
						{this.props.customers.map((customer, index) => {
							const last = index + 1 === length
							return (
								<React.Fragment key={`customer-index-${index}-${customer.id}`}>
									<div
										className={`single-customer`}
										onClick={() => this.handleSelectCustomer(customer)}
									>
										<p className={`single-customer--name`}>{customer.id}</p>
										<img
											src={BLUE_FORWARD_ARROW}
											alt={'blue-forward'}
											className={'forward-icon'}
										/>
									</div>
									{!last && <div className={'divider'} />}
								</React.Fragment>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

CustomersForm.propTypes = {
	useCustomer: PropTypes.func.isRequired,
	customers: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired
}

CustomersForm.defaultProps = {
	error: '',
	isLoading: false,
	customers: []
}

const mapStateToProps = state => {
	return {
		customers: state.auth.customers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		useCustomer: (customer, redirect) =>
			dispatch(useCustomer(customer, redirect))
	}
}

const ConnectedCustomersForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomersForm)
export default withRouter(ConnectedCustomersForm)
