import React from 'react'
import { SUCCESS } from '../../assets/Icons'
import { string, func } from 'prop-types'
import './success-panel.scss'

const SuccessPanel = ({ message, buttonClickHandler }) => (
	<div className="panel-success-container">
		<div>{message}</div>
		<img
			src={SUCCESS}
			className="icon"
			alt={'input-icon'}
			onClick={buttonClickHandler}
		/>
	</div>
)

SuccessPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default SuccessPanel
