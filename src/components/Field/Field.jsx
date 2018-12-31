import PropTypes from 'prop-types'
import React from 'react'
import './field.scss'

class FieldGroup extends React.PureComponent {
	render() {
		const {
			children,
			label,
			center = false,
			full = false,
			self = false,
			...rest
		} = this.props
		return (
			<div
				className={`field__group${center ? '-center' : ''} ${
					full ? 'full' : ''
				} ${self ? 'self' : ''} ${rest.extraClass || ''}`}
			>
				<p className={'field__label'}>{label}</p>
				{children}
			</div>
		)
	}
}

FieldGroup.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	center: PropTypes.bool,
	full: PropTypes.bool,
	self: PropTypes.bool
}

class TextField extends React.PureComponent {
	render() {
		console.log(this.props)
		return <p>{this.props.text}</p>
	}
}

TextField.propTypes = {
	text: PropTypes.string
}

TextField.defaultProps = {
	text: ''
}

export default {
	Group: FieldGroup,
	Text: TextField
}
