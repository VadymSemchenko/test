import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import './modals.scss'

class GatewayDetailsModal extends React.Component {
	render() {
		const { data } = this.props
		return (
			<div className={'modal__content padded new-gateway-survey'}>
				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group label={'Name'} secondaryLabel={data.gateway_type}>
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
					<Field.Group label={'Expiry'} secondaryLabel={data.expiry.type}>
						<Field.Text text={data.expiry.date.format('MMM D, YYYY')} />
					</Field.Group>
				</Card>

				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group
							label={'IP protocol'}
							secondaryLabel={data.network.mode}
						>
							<Field.Text text={data.network.ip} />
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Gateway IP'} full center={true}>
							<Field.Text
								text={`${data.network.gateway_ip.address} / ${
									data.network.gateway_ip.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Default route'} full center={true}>
							<Field.Text
								text={`${data.network.default_route.address} / ${
									data.network.default_route.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Local gateway'} full center={true}>
							<Field.Text
								text={`${data.network.gateway_local.address} / ${
									data.network.default_route.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group self label={'Additional Local Networks'}>
							<div className={'local-networks--container'}>
								<table>
									<tbody>
										<tr>
											<th className={'network'}>Network</th>
											<th className={'hop'}>Next Hop</th>
											<th className={'last'} />
										</tr>
										{data.network.additional_networks.map((net, index) => (
											<tr key={`additional-network-index-${index}`}>
												<td className={'network'}>{`${net.network.address} / ${
													net.network.mask
												}`}</td>
												<td className={'hop'}>{net.next_hop.address}</td>
												<td className={'last'} />
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Field.Group>
					</div>
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

GatewayDetailsModal.propTypes = {
	data: PropTypes.object.isRequired
}

export default GatewayDetailsModal
