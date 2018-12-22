import 'leaflet/dist/leaflet.css'
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

function NewAddressSurvey() {
	return (
		<div className={'modal__content padded new-address-survey'}>
			<Card header={false}>
				<div className={'form-row'}>
					<Form.Group label={'Name'}>
						<Form.Text placeholder={'Name'} />
					</Form.Group>
					<Form.Group center={true} label={''}>
						<Form.Toggle
							selected={0}
							selectedClass={'toggle-selected'}
							onChange={() => {}}
							options={[
								{ value: 0, label: 'Internal' },
								{ value: 1, label: 'External' }
							]}
						/>
					</Form.Group>
				</div>
				<Form.Group center={true} label={''}>
					<Form.Toggle
						selected={0}
						selectedClass={'toggle-selected'}
						onChange={() => {}}
						options={[{ value: 0, label: 'IPv4' }, { value: 1, label: 'IPv6' }]}
					/>
				</Form.Group>
				<Form.Group full label={''}>
					<div className={'flex-row center'}>
						<Form.Text style={{ flex: 2 }} placeholder={'Address'} />
						<p className={'ip-form-divider'}>/</p>
						<Form.Select
							style={{ flex: 1 }}
							placeholder={'Mask'}
							options={CATEGORIES}
						/>
					</div>
				</Form.Group>
				<div className={'form-row'}>
					<Form.Group label={'Category'}>
						<Form.Select placeholder={'Select category'} options={CATEGORIES} />
					</Form.Group>
					<Form.Group label={'Type'}>
						<Form.Select placeholder={'Select type'} options={CATEGORIES} />
					</Form.Group>
				</div>
				<div className={'form-row'}>
					<Form.Group label={'Expiry'}>
						<Form.Text placeholder={'Expiry'} />
					</Form.Group>
					<Form.Group center={true} label={''}>
						<Form.Toggle
							selected={0}
							selectedClass={'toggle-selected'}
							onChange={() => {}}
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
						placeholder={'Device description'}
						multiline={true}
						rows={4}
					/>
				</Form.Group>

				<Form.Group label={'Location'}>
					<Form.Select
						placeholder={'Select location value'}
						options={CATEGORIES}
					/>
				</Form.Group>

				<div className={'form-row'}>
					<Form.Group label={''}>
						<Form.Text placeholder={'Latitude'} />
					</Form.Group>
					<Form.Group label={''}>
						<Form.Text placeholder={'Longitude'} />
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
	)
}

export function Footer() {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'}>Add</Button>
		</div>
	)
}

NewAddressSurvey.Footer = Footer
export default NewAddressSurvey
