import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Map, TileLayer } from 'react-leaflet'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import './modals.scss'

const CATEGORIES = [
	{
		value: 0,
		label: 'Category #1'
	},
	{
		value: 1,
		label: 'Category #2'
	}
]

class NewAddressSurvey extends React.Component {
	state = {
		addressType: 0,
		protocolType: 0,
		expiryType: 0
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)
	onCategoryChange = val => this.changeField('category', val)
	onTypeChange = val => this.changeField('type', val)
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onLocationChange = val => this.changeField('location', val)
	onLatChange = val => this.changeField('lat', val)
	onLongChange = val => this.changeField('long', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onProtocolTypeChange = val => this.changeField('protocolType', val)
	onAddressTypeChange = val => this.changeField('addressType', val)
	onAddressChange = val => this.changeField('address', val)
	onMaskChange = val => this.changeField('mask', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onAdd(this.state)
		}
	}

	validate() {
		return true
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded new-address-survey'}>
					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group label={'Name'}>
								<Form.Text
									value={this.state.name}
									onChange={this.onNameChange}
									placeholder={'Name'}
								/>
							</Form.Group>
							<Form.Group center={true} label={''}>
								<Form.Toggle
									selected={this.state.addressType}
									selectedClass={'toggle-selected'}
									onChange={this.onAddressTypeChange}
									options={[
										{ value: 0, label: 'Internal' },
										{ value: 1, label: 'External' }
									]}
								/>
							</Form.Group>
						</div>
						<Form.Group center={true} label={''}>
							<Form.Toggle
								selected={this.state.protocolType}
								selectedClass={'toggle-selected'}
								onChange={this.onProtocolTypeChange}
								options={[
									{ value: 0, label: 'IPv4' },
									{ value: 1, label: 'IPv6' }
								]}
							/>
						</Form.Group>
						<Form.Group full label={''}>
							<div className={'flex-row center'}>
								<Form.Text
									value={this.state.address}
									onChange={this.onAddressChange}
									style={{ flex: 2 }}
									placeholder={'Address'}
								/>
								<p className={'ip-form-divider'}>/</p>
								<Form.Select
									value={this.state.mask}
									onChange={this.onMaskChange}
									style={{ flex: 1 }}
									placeholder={'Mask'}
									options={CATEGORIES}
								/>
							</div>
						</Form.Group>
						<div className={'form-row'}>
							<Form.Group label={'Category'}>
								<Form.Select
									value={this.state.category}
									onChange={this.onCategoryChange}
									placeholder={'Select category'}
									options={CATEGORIES}
								/>
							</Form.Group>
							<Form.Group label={'Type'}>
								<Form.Select
									value={this.state.type}
									onChange={this.onTypeChange}
									placeholder={'Select type'}
									options={CATEGORIES}
								/>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group label={'Expiry'}>
								<Form.Text
									value={this.state.expiry}
									onChange={this.onExpiryChange}
									placeholder={'Expiry'}
								/>
							</Form.Group>
							<Form.Group center={true} label={''}>
								<Form.Toggle
									selected={this.state.expiryType}
									selectedClass={'toggle-selected'}
									onChange={this.onExpiryTypeChange}
									options={[
										{ value: 0, label: 'Hard' },
										{ value: 1, label: 'Soft' }
									]}
								/>
							</Form.Group>
						</div>
					</Card>

					<Card header={false}>
						<Form.Group full={true} label={'Description'}>
							<Form.Text
								value={this.state.description}
								onChange={this.onDescriptionChange}
								placeholder={'Device description'}
								multiline={true}
								rows={4}
							/>
						</Form.Group>

						<Form.Group label={'Location'}>
							<Form.Select
								value={this.state.location}
								onChange={this.onLocationChange}
								placeholder={'Select location value'}
								options={CATEGORIES}
							/>
						</Form.Group>

						<div className={'form-row'}>
							<Form.Group label={''}>
								<Form.Text
									value={this.state.lat}
									onChange={this.onLatChange}
									placeholder={'Latitude'}
								/>
							</Form.Group>
							<Form.Group label={''}>
								<Form.Text
									value={this.state.long}
									onChange={this.onLongChange}
									placeholder={'Longitude'}
								/>
							</Form.Group>
						</div>

						<Map
							style={{ height: '300px', width: '100%' }}
							center={[51.505, -0.09]}
							zoom={13}
						>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
						</Map>
					</Card>
				</div>
				<div className={'wedge-modal__footer'}>
					<Footer onClick={this.onFinish} />
				</div>
			</React.Fragment>
		)
	}
}

export function Footer() {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'}>Add</Button>
		</div>
	)
}

NewAddressSurvey.propTypes = {
	onAdd: PropTypes.func.isRequired
}

NewAddressSurvey.Footer = Footer
export default NewAddressSurvey
