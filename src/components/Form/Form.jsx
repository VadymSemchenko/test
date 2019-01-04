import PropTypes from 'prop-types'
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import './form.scss'

class FormGroup extends React.PureComponent {
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
				className={`form__group${center ? '-center' : ''} ${
					full ? 'full' : ''
				} ${self ? 'self' : ''} ${rest.extraClass || ''}`}
			>
				<p className={'form__label'}>{label}</p>
				{children}
			</div>
		)
	}
}

FormGroup.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	center: PropTypes.bool,
	full: PropTypes.bool,
	self: PropTypes.bool
}

class TextInput extends React.PureComponent {
	render() {
		const { value, placeholder, onChange, ...rest } = this.props
		this.inputProps = {
			type: 'text',
			value: value,
			placeholder: placeholder,
			onChange: e => onChange(e.target.value),
			className: `form__input form__textinput ${
				rest.multiline ? 'multiline' : ''
			} ${rest.extraClass || ''}`,
			...rest
		}
		if (this.props.multiline) {
			return <textarea {...this.inputProps} />
		} else {
			return <input {...this.inputProps} />
		}
	}
}

TextInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
}

class ToggleButton extends React.PureComponent {
	render() {
		const { selectedClass, selected, onChange, options } = this.props
		return (
			<ButtonGroup>
				{options.map(opt => (
					<Button
						key={`toggle-button-index-key-${opt.value}-${opt.name}`}
						onClick={() => onChange(opt.value)}
						className={`form__input form__toggle ${
							selected === opt.value ? selectedClass : ''
						}`}
						bsStyle={selected === opt.value ? 'primary' : 'default'}
					>
						{opt.label}
					</Button>
				))}
			</ButtonGroup>
		)
	}
}

ToggleButton.propTypes = {
	selectedClass: PropTypes.string,
	selected: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.array
}

const colourStyles = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		borderWidth: 0
	}),
	indicatorSeparator: styles => ({
		...styles,
		width: 0
	}),
	menu: styles => ({
		...styles,
		zIndex: 401
	})
}

class SelectInput extends React.PureComponent {
	emptyFunction = () => {}

	render() {
		const { placeholder, value, onChange, options } = this.props
		return (
			<Select
				className={'form__input form__select'}
				name="color"
				placeholder={placeholder}
				value={value}
				onChange={onChange || this.emptyFunction}
				options={options}
				styles={colourStyles}
			/>
		)
	}
}

SelectInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.array
}

export default {
	Group: FormGroup,
	Text: TextInput,
	Select: SelectInput,
	Toggle: ToggleButton
}
