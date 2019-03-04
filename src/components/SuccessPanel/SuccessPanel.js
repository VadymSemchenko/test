import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { string } from 'prop-types'
import './success-panel.scss'

const SuccessPanel = ({ message }) => (
	<div className="panel-success-container">
		<div>{message}</div>
		<div className="icon-container">
			<FontAwesomeIcon icon="check" />
		</div>
	</div>
)

SuccessPanel.propTypes = {
	message: string.isRequired
}

export default SuccessPanel
