import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './email-display.scss'
import { emailSelector } from '../../store/user/selectors'

const EmailPanel = ({ email }) => (
	<div className="email-panel-container">
		<div className="email-icon-container">
			<FontAwesomeIcon icon="envelope" />
		</div>
		<div>{email}</div>
	</div>
)

EmailPanel.propTypes = {
	email: string.isRequired
}

const mapStateToProps = state => ({
	email: emailSelector(state)
	// email: 'test@e.mail'
})

export default connect(mapStateToProps)(EmailPanel)
