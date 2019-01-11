import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import Form from '../../components/Form/Form'
import { Footer } from './commons'
import './modals.scss'

class CreateNewService extends React.Component {
	state = {
		name: '',
		description: '',
		protocol: '',
		port: ''
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)
	onDescriptionChange = val => this.changeField('description', val)
	onPortChange = val => this.changeField('port', val)
	onProtocolChange = val => this.changeField('protocol', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onFinish(this.state)
		}
	}

	validate() {
		return true
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded create-new-protocol'}>
					<Form.Group full label={'Name'}>
						<Form.Text
							value={this.state.name}
							onChange={this.onNameChange}
							placeholder={'Name'}
						/>
					</Form.Group>
					<Form.Group full={true} label={'Description'}>
						<Form.Text
							value={this.state.description}
							onChange={this.onDescriptionChange}
							placeholder={'Device description'}
							multiline={true}
							rows={4}
						/>
					</Form.Group>
					<Form.Group full label={'Protocol'}>
						<Form.Text
							value={this.state.protocol}
							onChange={this.onProtocolChange}
							placeholder={'Protocol'}
						/>
					</Form.Group>
					<Form.Group full label={'Port'}>
						<Form.Text
							value={this.state.port}
							onChange={this.onPortChange}
							placeholder={'Port'}
						/>
					</Form.Group>

					<div className={'survey__footer'}>
						<Button bsStyle={'primary'} onClick={this.onFinish}>
							Create
						</Button>
					</div>
				</div>
				{/*<div className={ 'wedge-modal__footer' }>*/}
				{/**/}
				{/*</div>*/}
			</React.Fragment>
		)
	}
}

CreateNewService.propTypes = {
	onFinish: PropTypes.func.isRequired,
	edit: PropTypes.bool,
	item: PropTypes.object
}

CreateNewService.Footer = Footer
export default CreateNewService
