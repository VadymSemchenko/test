import PropTypes from 'prop-types'
import React from 'react'
import './field.scss'

class FieldGroup extends React.PureComponent {
	renderSecondLabel = () => {
		if (this.props.secondaryLabel) {
			return (
				<React.Fragment>
					<div className={'divider--small'} />
					<span className={'field__label secondary'}>
						{this.props.secondaryLabel}
					</span>
				</React.Fragment>
			)
		}
	}

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
				<p className={'field__label'}>
					<span className={'primary'}>{label}</span>
					{this.renderSecondLabel()}
				</p>
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
	self: PropTypes.bool,
	secondaryLabel: PropTypes.string
}

class TextField extends React.PureComponent {
	render() {
		return <p className={'field__textfield'}>{this.props.text}</p>
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
