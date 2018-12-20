import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import PropTypes from 'prop-types'
import './form.scss'

function FormGroup({ children, label, center = false, full = false }) {
	return (
		<div
			className={`form__group${center ? '-center' : ''} ${full ? 'full' : ''}`}
		>
			<p className={'form__group-label'}>{label}</p>
			{children}
		</div>
	)
}

FormGroup.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	center: PropTypes.bool,
	full: PropTypes.bool
}

function TextInput({ placeholder, value, onChange = () => {}, ...rest }) {
	const inputProps = {
		type: 'text',
		value,
		placeholder,
		onChange: e => onChange(e.target.value),
		className: `form__input form__textinput ${
			rest.multiline ? 'multiline' : ''
		}`,
		...rest
	}

	if (rest.multiline) {
		return <textarea {...inputProps} />
	} else {
		return <input {...inputProps} />
	}
}

TextInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
}

function ToggleButton({ selectedClass, selected, onChange, options }) {
	return (
		<ButtonGroup className={''}>
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
	})
}

function SelectInput({ placeholder, value, onChange = () => {}, options }) {
	return (
		<Select
			className={'form__input form__select'}
			name="color"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			options={options}
			styles={colourStyles}
		/>
	)
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
