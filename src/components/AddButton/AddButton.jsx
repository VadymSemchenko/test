import PropTypes from 'prop-types'
import React from 'react'
import './add-button.scss'

export default function AddButton({ className, children, onClick }) {
	return (
		<div className={`${className} add-button`} onClick={onClick}>
			<div className={'square'}>+</div>
			{children && <p className={'text'}>{children}</p>}
		</div>
	)
}

AddButton.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
}
