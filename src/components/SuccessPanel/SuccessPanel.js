import React from 'react'
import { Panel } from 'react-bootstrap'
import { SUCCESS } from '../../assets/Icons'
import { string, func } from 'prop-types'
import './success-panel.scss'

const SuccessPanel = ({ message, buttonClickHandler }) => (
	<Panel bsStyle="success">
		<Panel.Heading>
			<div className="success-container">
				<div>{message}</div>
				<img
					src={SUCCESS}
					className="icon"
					alt={'input-icon'}
					onClick={buttonClickHandler}
				/>
			</div>
		</Panel.Heading>
	</Panel>
)

SuccessPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default SuccessPanel
