import 'leaflet/dist/leaflet.css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import Translator from '../../utils/enumTranslator'
import { renderLocationDetails } from './commons'
import './modals.scss'

class GatewayDetailsModal extends React.Component {
	render() {
		const { data } = this.props
		const type = Translator.type(data.type)
		const category = Translator.category(data.category)
		const expiration = Translator.expirationType(data.expiry.type)
		const profileGroup = data.profileGroup || 'Unknown group'
		const mode = Translator.mode(data.network.mode)
		const protocol = Translator.protocolType(data.network.ip)
		return (
			<div className={'modal__content padded new-gateway-survey'}>
				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group label={'Name'} secondaryLabel={data.gateway_type}>
							<Field.Text text={data.name} />
						</Field.Group>
						<Field.Group label={'Profile Group'}>
							<Field.Text text={profileGroup} />
						</Field.Group>
					</div>
					<div className={'form-row'}>
						<Field.Group label={'Category / Type'}>
							<Field.Text text={`${category.label}/${type.label}`} />
						</Field.Group>
						<Field.Group label={'Asset value'}>
							<Field.Text text={data.assetValue} />
						</Field.Group>
					</div>
					<Field.Group label={'Expiry'} secondaryLabel={expiration.label}>
						<Field.Text text={moment(data.expiry.date).format('MMM D, YYYY')} />
					</Field.Group>
				</Card>

				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group label={'IP protocol'} secondaryLabel={mode.label}>
							<Field.Text text={protocol.label} />
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Gateway IP'} full center={true}>
							<Field.Text
								text={`${data.network.gatewayIp.address} / ${
									data.network.gatewayIp.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Default route'} full center={true}>
							<Field.Text
								text={`${data.network.defaultRoute.address} / ${
									data.network.defaultRoute.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'space-above'}>
						<Field.Group label={'Local gateway'} full center={true}>
							<Field.Text
								text={`${data.network.gatewayLocal.address} / ${
									data.network.gatewayLocal.mask
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
										{data.network.additionalNetworks.map((net, index) => (
											<tr key={`additional-network-index-${index}`}>
												<td className={'network'}>{`${net.network.address} / ${
													net.network.mask
												}`}</td>
												<td className={'hop'}>{net.nextHop.address}</td>
												<td className={'last'} />
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Field.Group>
					</div>
				</Card>

				<Card header={false}>{renderLocationDetails(data)}</Card>
			</div>
		)
	}
}

GatewayDetailsModal.propTypes = {
	data: PropTypes.object.isRequired
}

export default GatewayDetailsModal
