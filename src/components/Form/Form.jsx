import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import './form.scss'

function FormGroup({ children, label, center = false, full = true }) {
	return (
		<div
			className={`form__group${center ? '-center' : ''} ${full ? 'full' : ''}`}
		>
			<p className={'form__group-label'}>{label}</p>
			{children}
		</div>
	)
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
			options={options}
			styles={colourStyles}
		/>
	)
}

export default {
	Group: FormGroup,
	Text: TextInput,
	Select: SelectInput,
	Toggle: ToggleButton
}
