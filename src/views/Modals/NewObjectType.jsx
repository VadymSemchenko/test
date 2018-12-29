import React from 'react'
import PropTypes from 'prop-types'
import './modals.scss'

import DeviceIcon from '../../assets/img/PNG/device.png'
import GatewayIcon from '../../assets/img/PNG/gateway.png'
import AddressIcon from '../../assets/img/PNG/address.png'
import GoArrow from '../../assets/img/PNG/arrow.png'

const AVAILABLE_TYPES = [
	{
		name: 'device',
		title: 'Device',
		icon: DeviceIcon
	},
	{
		name: 'gateway',
		title: 'Gateway',
		icon: GatewayIcon
	},
	{
		name: 'address',
		title: 'Address',
		icon: AddressIcon
	}
]

export default class NewObjectType extends React.PureComponent {
	render() {
		const { onTypeChoose } = this.props
		return (
			<div className={'modal__content padded'}>
				<p className={'big'}>What type of object would you like to add?</p>
				{AVAILABLE_TYPES.map(type => (
					<React.Fragment key={`types-index-${type.name}`}>
						<div className={'divider divider-horizontal'} />
						<div
							className={'option-container'}
							onClick={() => onTypeChoose(type.name)}
						>
							<img
								className={'type-icon'}
								src={type.icon}
								alt={`${type.name}-icon`}
							/>
							<p className={'option medium'}>{type.title}</p>
							<img src={GoArrow} className={'go-arrow'} alt={'go-arrow'} />
						</div>
					</React.Fragment>
				))}
			</div>
		)
	}
}

NewObjectType.propTypes = {
	onTypeChoose: PropTypes.func.isRequired
}