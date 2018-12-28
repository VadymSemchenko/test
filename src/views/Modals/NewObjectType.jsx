import React from 'react'
import PropTypes from 'prop-types'
import './modals.scss'

const AVAILABLE_TYPES = [
	{
		name: 'device',
		title: 'Device',
		icon: ''
	},
	{
		name: 'gateway',
		title: 'Gateway',
		icon: ''
	},
	{
		name: 'address',
		title: 'Address',
		icon: ''
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
							<i className={'icon pe-7s-angle-right'} />
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
