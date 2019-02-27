import React from 'react'
import { Panel } from 'react-bootstrap'
import { CLOSE_BLACK } from '../../assets/Icons'
import { string, func } from 'prop-types'
import './error-panel.scss'

const ErrorPanel = ({ message, buttonClickHandler }) => (
	<Panel bsStyle="danger">
		<Panel.Heading>
			<div className="error-container">
				<div>{message}</div>
				<img
					src={CLOSE_BLACK}
					className="close-icon"
					alt={'input-icon'}
					onClick={buttonClickHandler}
				/>
			</div>
		</Panel.Heading>
	</Panel>
)

ErrorPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default ErrorPanel
