import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Map, TileLayer } from 'react-leaflet'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import './modals.scss'
import {
	AVAILABLE_REGIONS,
	EXPIRATION_TYPES,
	GATEWAY_TYPES,
	IP_MODES_OPTIONS,
	IP_TYPES,
	LOCATION_TYPE,
	LOCATION_TYPE_OPTIONS,
	MASKS,
	OBJECT_CATEGORIES,
	OBJECT_TYPES
} from '../../enums'

class NewGatewaySurvey extends React.Component {
	state = {
		gatewayType: 0,
		expiryType: 0,
		protocolType: 0,
		addressType: 0,
		additionalNetworks: [],
		location: LOCATION_TYPE_OPTIONS[LOCATION_TYPE.AUTO]
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
	onGatewayTypeChange = val => this.changeField('gatewayType', val)
	onProtocolTypeChange = val => this.changeField('protocolType', val)
	onAddressTypeChange = val => this.changeField('addressType', val)
	onStaticAddressChange = val => this.changeField('staticAddress', val)
	onStaticMaskChange = val => this.changeField('staticMask', val)
	onDefaultAddressChange = val => this.changeField('defaultAddress', val)
	onDefaultMaskChange = val => this.changeField('defaultMask', val)
	onLocalAddressChange = val => this.changeField('localAddress', val)
	onLocalMaskChange = val => this.changeField('localMask', val)
	onNewAdditionalNetworkChange = val =>
		this.changeField('newAdditionalNetwork', val)
	onNewAdditionalHopChange = val => this.changeField('newAdditionalHop', val)
	onRegionChange = val => this.changeField('region', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onAdd(this.state)
		}
	}

	onAdd = () => {
		this.setState({
			additionalNetworks: [
				...this.state.additionalNetworks,
				{
					network: this.state.newAdditionalNetwork,
					hop: this.state.newAdditionalHop
				}
			],
			newAdditionalNetwork: '',
			newAdditionalHop: ''
		})
	}

	onRemove = index => {
		this.setState({
			additionalNetworks: this.state.additionalNetworks.filter(
				(val, ind) => ind !== index
			)
		})
	}

	validate() {
		return true
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded new-gateway-survey'}>
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
									selected={this.state.gatewayType}
									selectedClass={'toggle-selected'}
									onChange={this.onGatewayTypeChange}
									options={GATEWAY_TYPES}
								/>
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
									options={EXPIRATION_TYPES}
								/>
							</Form.Group>
						</div>
					</Card>

					<Card header={false}>
						<Form.Group center={true} label={''}>
							<Form.Toggle
								selected={this.state.protocolType}
								selectedClass={'toggle-selected'}
								onChange={this.onProtocolTypeChange}
								options={IP_TYPES}
							/>
						</Form.Group>
						<div className={'form-row space-above'}>
							<Form.Group label={'Gateway Internet IP'} />
							<Form.Group center={true} label={''}>
								<Form.Toggle
									selected={this.state.addressType}
									selectedClass={'toggle-selected'}
									onChange={this.onAddressTypeChange}
									options={IP_MODES_OPTIONS}
								/>
							</Form.Group>
						</div>
						<Form.Group full label={''}>
							<div className={'flex-row center space-above'}>
								<Form.Text
									value={this.state.staticAddress}
									onChange={this.onStaticAddressChange}
									style={{ flex: 2 }}
									placeholder={'Static IP'}
								/>
								<p className={'ip-form-divider'}>/</p>
								<Form.Select
									value={this.state.staticMask}
									onChange={this.onStaticMaskChange}
									style={{ flex: 1 }}
									placeholder={'Mask'}
									options={MASKS}
								/>
							</div>
						</Form.Group>
						<Form.Group full label={'Default route'}>
							<div className={'flex-row center'}>
								<Form.Text
									value={this.state.defaultAddress}
									onChange={this.onDefaultAddressChange}
									style={{ flex: 2 }}
									placeholder={'Default IP'}
								/>
								<p className={'ip-form-divider'}>/</p>
								<Form.Select
									value={this.state.defaultMask}
									onChange={this.onDefaultMaskChange}
									style={{ flex: 1 }}
									placeholder={'Mask'}
									options={MASKS}
								/>
							</div>
						</Form.Group>
						<Form.Group full label={'Gateway local IP'}>
							<div className={'flex-row center'}>
								<Form.Text
									value={this.state.localAddress}
									onChange={this.onLocalAddressChange}
									style={{ flex: 2 }}
									placeholder={'Local IP'}
								/>
								<p className={'ip-form-divider'}>/</p>
								<Form.Select
									value={this.state.localMask}
									onChange={this.onLocalMaskChange}
									style={{ flex: 1 }}
									placeholder={'Mask'}
									options={MASKS}
								/>
							</div>
						</Form.Group>
						<Form.Group self label={'Additional Local Networks'}>
							<div className={'local-networks--container'}>
								<table>
									<tbody>
										<tr>
											<th className={'network'}>Network</th>
											<th className={'hop'}>Next Hop</th>
											<th className={'last'} />
										</tr>
										{this.state.additionalNetworks.map((net, index) => (
											<tr key={`additional-network-index-${index}`}>
												<td className={'network'}>{net.network}</td>
												<td className={'hop'}>{net.hop}</td>
												<td className={'last'}>
													<i
														className={'pe-7s-close red-delete-icon'}
														onClick={() => this.onRemove(index)}
													/>
												</td>
											</tr>
										))}
										<tr className={'new-entry'}>
											<td>
												<Form.Text
													value={this.state.newAdditionalNetwork}
													onChange={this.onNewAdditionalNetworkChange}
													extraClass={'light'}
													placeholder={'Network'}
												/>
											</td>
											<td>
												<Form.Text
													value={this.state.newAdditionalHop}
													onChange={this.onNewAdditionalHopChange}
													extraClass={'light'}
													placeholder={'Next hop'}
												/>
											</td>
											<td className={'last'}>
												<AddButton onClick={this.onAdd} />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Form.Group>
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
					<Footer onClick={this.onFinish} />
				</div>
			</React.Fragment>
		)
	}
}

export function Footer({ onClick }) {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'} onClick={onClick}>
				Add
			</Button>
		</div>
	)
}

NewGatewaySurvey.propTypes = {
	onAdd: PropTypes.func.isRequired
}

Footer.propTypes = {
	onClick: PropTypes.func.isRequired
}

NewGatewaySurvey.Footer = Footer
export default NewGatewaySurvey
