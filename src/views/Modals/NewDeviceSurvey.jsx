import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Map, TileLayer } from 'react-leaflet'
import AddButton from '../../components/AddButton/AddButton'
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

class NewDeviceSurvey extends React.Component {
	state = {
		expiryType: 0
	}

	changeField = (field, value) => {
		this.setState(
			{
				[field]: value
			},
			() => console.log(this.state)
		)
	}

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
				<div className={'modal__content padded new-device-survey'}>
					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group label={'Name'}>
								<Form.Text
									value={this.state.name}
									onChange={this.changeField.bind(this, 'name')}
									placeholder={'Name'}
								/>
							</Form.Group>
							<Form.Group label={'Profile Group'}>
								<div className={'flex-row baseline'}>
									<Form.Select
										value={this.state.profile}
										onChange={this.changeField.bind(this, 'profile')}
										placeholder={'Select profile group'}
										options={CATEGORIES}
									/>
									<AddButton className={'space-left'} onClick={() => {}} />
								</div>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group label={'Category'}>
								<Form.Select
									value={this.state.category}
									onChange={this.changeField.bind(this, 'category')}
									placeholder={'Select category'}
									options={CATEGORIES}
								/>
							</Form.Group>
							<Form.Group label={'Type'}>
								<Form.Select
									value={this.state.type}
									onChange={this.changeField.bind(this, 'type')}
									placeholder={'Select type'}
									options={CATEGORIES}
								/>
							</Form.Group>
						</div>
						<Form.Group label={'Asset value'}>
							<Form.Select
								value={this.state.asset}
								onChange={this.changeField.bind(this, 'asset')}
								placeholder={'Select asset value'}
								options={CATEGORIES}
							/>
						</Form.Group>
						<div className={'form-row'}>
							<Form.Group label={'Expiry'}>
								<Form.Text
									value={this.state.expiry}
									onChange={this.changeField.bind(this, 'expiry')}
									placeholder={'Expiry'}
								/>
							</Form.Group>
							<Form.Group center={true} label={''}>
								<Form.Toggle
									selected={this.state.expiryType}
									selectedClass={'toggle-selected'}
									onChange={this.changeField.bind(this, 'expiryType')}
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
								onChange={this.changeField.bind(this, 'description')}
								placeholder={'Device description'}
								multiline={true}
								rows={4}
							/>
						</Form.Group>

						<Form.Group label={'Location'}>
							<Form.Select
								value={this.state.location}
								onChange={this.changeField.bind(this, 'location')}
								placeholder={'Select location value'}
								options={CATEGORIES}
							/>
						</Form.Group>

						<div className={'form-row'}>
							<Form.Group label={''}>
								<Form.Text
									value={this.state.lat}
									onChange={this.changeField.bind(this, 'lat')}
									placeholder={'Latitude'}
								/>
							</Form.Group>
							<Form.Group label={''}>
								<Form.Text
									value={this.state.long}
									onChange={this.changeField.bind(this, 'long')}
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

export function Footer({ onClick }) {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'} onClick={onClick}>
				Add
			</Button>
		</div>
	)
}

NewDeviceSurvey.propTypes = {
	onAdd: PropTypes.func.isRequired
}

Footer.propTypes = {
	onClick: PropTypes.func.isRequired
}

NewDeviceSurvey.Footer = Footer
export default NewDeviceSurvey
