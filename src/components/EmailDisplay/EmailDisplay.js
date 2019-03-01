import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import { SUCCESS } from '../../assets/Icons'
import './email-display.scss'

const EmailPanel = ({ email }) => (
	<div className="email-panel-container">
		<div>{email}</div>
		<img src={SUCCESS} className="icon" alt={'input-icon'} />
	</div>
)

EmailPanel.propTypes = {
	email: string.isRequired
}

const mapStateToProps = () => ({
	// email: emailSelector(state)
	email: 'test@debugger.a'
})

export default connect(mapStateToProps)(EmailPanel)
