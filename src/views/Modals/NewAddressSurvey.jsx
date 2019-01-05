import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import {
	ADDRESS_TYPE,
	ADDRESS_TYPES_OPTIONS,
	AVAILABLE_REGIONS,
	EXPIRATION_TYPE,
	EXPIRATION_TYPE_OPTIONS,
	IP_TYPE,
	IP_TYPE_OPTIONS,
	LOCATION_TYPE,
	LOCATION_TYPE_OPTIONS,
	MASKS,
	OBJECT_ASSET_VALUES,
	OBJECT_CATEGORIES,
	OBJECT_TYPES
} from '../../enums'
import Translator from '../../utils/enumTranslator'
import { Footer } from './commons'
import './modals.scss'

class NewAddressSurvey extends React.Component {
	constructor(props) {
		super(props)
		if (props.edit) {
			this.state = {
				name: props.item.name,
				expiryType: props.item.expiry.type,
				expiry: props.item.expiry.date,
				profile: Translator.profileGroup(props.item.profileGroup),
				category: Translator.category(props.item.category),
				type: Translator.type(props.item.type),
				asset: OBJECT_ASSET_VALUES[props.item.assetValue], // NOT SAFE, TODO LATED
				location: Translator.location(props.item.location.type),
				lat: props.item.location.latitude,
				long: props.item.location.longitude,
				region: Translator.region(props.item.location.region),
				description: props.item.description,
				protocolType: Translator.protocolType(props.item.network.ip).value,
				addressType: Translator.addressType(props.item.addressType).value,
				address: props.item.network.address.address,
				mask: Translator.mask(props.item.network.address.mask)
			}
		} else {
			this.state = {
				addressType: ADDRESS_TYPE.INTERNAL,
				protocolType: IP_TYPE.IPv4,
				expiryType: EXPIRATION_TYPE.HARD,
				location: LOCATION_TYPE_OPTIONS[LOCATION_TYPE.AUTO]
			}
		}
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
	onRegionChange = val => this.changeField('region', val)

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
									options={ADDRESS_TYPES_OPTIONS}
								/>
							</Form.Group>
						</div>
						<Form.Group center={true} label={''}>
							<Form.Toggle
								selected={this.state.protocolType}
								selectedClass={'toggle-selected'}
								onChange={this.onProtocolTypeChange}
								options={IP_TYPE_OPTIONS}
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
									options={MASKS}
								/>
							</div>
						</Form.Group>
						<div className={'form-row'}>
							<Form.Group label={'Category'}>
								<Form.Select
									value={this.state.category}
									onChange={this.onCategoryChange}
									placeholder={'Select category'}
									options={OBJECT_CATEGORIES}
								/>
							</Form.Group>
							<Form.Group label={'Type'}>
								<Form.Select
									value={this.state.type}
									onChange={this.onTypeChange}
									placeholder={'Select type'}
									options={OBJECT_TYPES}
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
									options={EXPIRATION_TYPE_OPTIONS}
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
								options={LOCATION_TYPE_OPTIONS}
							/>
						</Form.Group>

						<div className={'form-row'}>
							{this.state.location.value === LOCATION_TYPE.REGION && (
								<Form.Group label={'Region'}>
									<Form.Select
										value={this.state.region}
										onChange={this.onRegionChange}
										placeholder={'Select region'}
										options={AVAILABLE_REGIONS}
									/>
								</Form.Group>
							)}
							{this.state.location.value === LOCATION_TYPE.COORDINATES && (
								<React.Fragment>
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
								</React.Fragment>
							)}
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
					<Footer onClick={this.onFinish} edit={this.props.edit} />
				</div>
			</React.Fragment>
		)
	}
}

NewAddressSurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	edit: PropTypes.bool,
	item: PropTypes.object
}

NewAddressSurvey.Footer = Footer
export default NewAddressSurvey
