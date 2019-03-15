import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { isEmpty } from 'lodash'
import './select-with-create.scss'
import groupValidationSchema from '../../validationSchemas/groupValidationSchema'

export default class SelectWithCreate extends React.Component {
	render() {
		return (
			<Dropdown id={this.props.placeholder} className="select-with-create">
				<Dropdown.Toggle>
					<p>
						{this.props.selected
							? this.props.selected.label
							: this.props.placeholder}
					</p>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{this.props.options.map((opt, index) => (
						<MenuItem
							key={`select-item-${index}-${opt.value}`}
							className={'wedge-menu-item'}
							onSelect={() => this.props.onChange(opt)}
						>
							{opt.label}
						</MenuItem>
					))}
					{!this.props.createOpened && (
						<Formik
							initialValues={{
								name: ''
							}}
							validationSchema={groupValidationSchema}
							onSubmit={(values, { resetForm }) => {
								this.props.onCreate(values.name)
								resetForm()
							}}
						>
							{({ errors }) => (
								<Form className="create-new">
									<div className="field-error-container">
										<Field
											name="name"
											placeholder="New group name"
											onSelect={e => e.stopPropagation()}
											onFocus={e => e.preventDefault()}
											className="form__textinput"
										/>
										<p className="error-text">{errors.name}</p>
									</div>
									<button
										disabled={!isEmpty(errors)}
										type="submit"
										className="save-button btn"
									>
										Save
									</button>
								</Form>
							)}
						</Formik>
					)}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

SelectWithCreate.propTypes = {
	selected: PropTypes.object,
	options: PropTypes.array.isRequired,
	createOpened: PropTypes.bool.isRequired,
	placeholder: PropTypes.string,
	onCreate: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}
