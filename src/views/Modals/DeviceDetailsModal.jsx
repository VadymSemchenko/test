import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import './modals.scss'

class DeviceDetailsModal extends React.Component {
	render() {
		const { data } = this.props
		return (
			<div className={'modal__content padded new-device-survey'}>
				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group label={'Name'}>
							<Field.Text text={data.name} />
						</Field.Group>
						<Field.Group label={'Profile Group'}>
							<Field.Text text={data.profile_group.name} />
						</Field.Group>
					</div>
					<div className={'form-row'}>
						<Field.Group label={'Category / Type'}>
							<Field.Text text={`${data.category}/${data.type}`} />
						</Field.Group>
						<Field.Group label={'Asset value'}>
							<Field.Text text={data.asset_value} />
						</Field.Group>
					</div>
					<Field.Group label={'Expiry '} secondaryLabel={data.expiry.type}>
						<Field.Text text={data.expiry.date.format('MMM D, YYYY')} />
					</Field.Group>
				</Card>
				<Card header={false}>
					<Field.Group full={true} label={'Description'}>
						<Field.Text text={data.description} />
					</Field.Group>

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
}

DeviceDetailsModal.propTypes = {
	data: PropTypes.object.isRequired
}

export default DeviceDetailsModal
