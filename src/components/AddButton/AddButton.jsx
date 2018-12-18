import PropTypes from 'prop-types'
import React from 'react'
import './add-button.scss'

export default function AddButton({ children, onClick }) {
	return (
		<div className={'add-button'} onClick={onClick}>
			<div className={'square'}>+</div>
			<p className={'text'}>{children}</p>
		</div>
	)
}

AddButton.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}
