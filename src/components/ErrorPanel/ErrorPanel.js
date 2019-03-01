import React from 'react'
import { Panel } from 'react-bootstrap'
import { string, func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './error-panel.scss'

const ErrorPanel = ({ message, buttonClickHandler }) => (
	<Panel bsStyle="danger">
		<Panel.Heading>
			<div className="error-container">
				<div>{message}</div>
				<div className="email-icon-container" onClick={buttonClickHandler}>
					<FontAwesomeIcon icon="times" />
				</div>
			</div>
		</Panel.Heading>
	</Panel>
)

ErrorPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default ErrorPanel
