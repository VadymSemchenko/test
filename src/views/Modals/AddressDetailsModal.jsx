import 'leaflet/dist/leaflet.css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import Translator from '../../utils/enumTranslator'
import { renderLocationDetails } from './commons'
import './modals.scss'

class AddressDetailsModal extends React.Component {
	render() {
		const { data } = this.props

		const type = Translator.type(data.type)
		const category = Translator.category(data.category)
		const expiration = Translator.expirationType(data.expiry.type)
		const profileGroup = Translator.profileGroup(data.profileGroup)
		const protocol = Translator.protocolType(data.network.ip)
		const addressType = Translator.addressType(data.addressType)

		return (
			<div className={'modal__content padded new-device-survey'}>
				<Card header={false}>
					<div className={'form-row'}>
						<Field.Group label={'Name'} secondaryLabel={addressType.label}>
							<Field.Text text={data.name} />
						</Field.Group>
						<Field.Group label={'Profile Group'}>
							<Field.Text text={profileGroup.label} />
						</Field.Group>
					</div>
					<div className={'form-row'}>
						<Field.Group label={'Address'} full secondaryLabel={protocol.label}>
							<Field.Text
								text={`${data.network.address.address} / ${
									data.network.address.mask
								}`}
							/>
						</Field.Group>
					</div>
					<div className={'form-row space-above'}>
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
				<Card header={false}>{renderLocationDetails(data)}</Card>
			</div>
		)
	}
}

AddressDetailsModal.propTypes = {
	data: PropTypes.object.isRequired
}

export default AddressDetailsModal
