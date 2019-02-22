import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import {
	AVAILABLE_REGIONS,
	EXPIRATION_TYPE,
	EXPIRATION_TYPE_OPTIONS,
	LOCATION_TYPE,
	LOCATION_TYPE_OPTIONS,
	OBJECT_ASSET_VALUES,
	OBJECT_CATEGORIES,
	OBJECT_TYPES,
	PROFILE_GROUPS
} from '../../enums'
import Translator from '../../utils/enumTranslator'
import { Footer } from './commons'
import './modals.scss'

class NewDeviceSurvey extends React.Component {
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
				description: props.item.description
			}
		} else {
			this.state = {
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
	onProfileChange = val => this.changeField('profile', val)
	onCategoryChange = val => this.changeField('category', val)
	onTypeChange = val => this.changeField('type', val)
	onAssetChange = val => this.changeField('asset', val)
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onLocationChange = val => this.changeField('location', val)
	onLatChange = val => this.changeField('lat', val)
	onLongChange = val => this.changeField('long', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
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
				<div className={'modal__content padded new-device-survey'}>
					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group label={'Name'}>
								<Form.Text
									value={this.state.name}
									onChange={this.onNameChange}
									placeholder={'Name'}
								/>
							</Form.Group>
							<Form.Group label={'Profile Group'}>
								<div className={'flex-row baseline'}>
									<Form.Select
										value={this.state.profile}
										onChange={this.onProfileChange}
										placeholder={'Select profile group'}
										options={PROFILE_GROUPS}
									/>
									<AddButton className={'space-left'} />
								</div>
							</Form.Group>
						</div>
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
						<Form.Group label={'Asset value'}>
							<Form.Select
								value={this.state.asset}
								onChange={this.onAssetChange}
								placeholder={'Select asset value'}
								options={OBJECT_ASSET_VALUES}
							/>
						</Form.Group>
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
					<Card header={false} className={'component-coming-soon'}>
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

NewDeviceSurvey.defaultProps = {
	edit: false
}

NewDeviceSurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	edit: PropTypes.bool,
	item: PropTypes.object
}

NewDeviceSurvey.Footer = Footer
export default NewDeviceSurvey
