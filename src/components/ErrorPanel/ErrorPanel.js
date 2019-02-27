import React from 'react'
import { Panel } from 'react-bootstrap'
import { CLOSE } from '../../assets/Icons'
import { string, func } from 'prop-types'
import './error-panel.scss'

const ErrorPanel = ({ errorMessage, closeClickHandler }) => (
	<Panel bsStyle="danger">
		<Panel.Heading>
			<div className="error-container">
				<div>{errorMessage}</div>
				<img
					src={CLOSE}
					className="close-icon"
					alt={'input-icon'}
					onClick={closeClickHandler}
				/>
			</div>
		</Panel.Heading>
	</Panel>
)

ErrorPanel.propTypes = {
	errorMessage: string.isRequired,
	closeClickHandler: func.isRequired
}

export default ErrorPanel
