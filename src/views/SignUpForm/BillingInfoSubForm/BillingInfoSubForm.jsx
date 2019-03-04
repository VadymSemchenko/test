import React, { Component } from 'react'

import '../sign-up-form.scss'

export default class BillingSubForm extends Component {
	render() {
		return (
			<form onSubmit={this.onSubmit} className="form-container">
				<div>Billing Info Sub Form</div>
			</form>
		)
	}
}
