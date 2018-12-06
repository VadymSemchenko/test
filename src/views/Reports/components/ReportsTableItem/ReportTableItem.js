import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import ArrowLeftBottomIcon from '../../../../assets/img/PNG/Acreto_Icon 13.png'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import ApplicationIcon from '../../../../assets/img/PNG/Acreto_Icon 17.png'
import ThreatIcon from '../../../../assets/img/PNG/Acreto_Icon 18.png'
import TerminatedIcon from '../../../../assets/img/PNG/Acreto_Icon 19.png'
import ActiveIcon from '../../../../assets/img/PNG/Acreto_Icon 20.png'
import AllowIcon from '../../../../assets/img/PNG/Acreto_Icon 23.png'
import ChainIcon from '../../../../assets/img/PNG/Acreto_Icon 24.png'
import CompletedIcon from '../../../../assets/img/PNG/Acreto_Icon 27.png'
import TimetoutIcon from '../../../../assets/img/PNG/Acreto_Icon 28.png'
import PolicyIcon from '../../../../assets/img/PNG/policy_icon.png'

import './reports-table-item.scss'

const STATUS = [
	{ slug: 'active', name: 'Active', icon: ActiveIcon },
	{ slug: 'completed', icon: CompletedIcon, name: 'Completed' },
	{ slug: 'terminated', icon: TerminatedIcon, name: 'Terminated' },
	{ slug: 'timeout', icon: TimetoutIcon, name: 'Timed out' }
]

export default function ReportsTableItem({ data }) {
	const status = STATUS.find(s => s.slug === data.status)
	const getIconForAction = action => {
		switch (action) {
			case 'Allow':
				return AllowIcon
			case 'URL':
				return ChainIcon
			default:
				return null
		}
	}
	return (
		<div className={'reports-table-item item'}>
			<div className={'field field__policy'}>
				<img
					src={ArrowLeftBottomIcon}
					alt={'arrow-icon'}
					className={'small-icon'}
				/>
				<img src={PolicyIcon} alt={'policy-icon'} className={'small-icon'} />
				<div>
					<p className={'medium'}>{moment(data.date).format('MM/DD/YYYY')}</p>
					<p className={'medium'}>{moment(data.date).format('HH:mm:ss')}</p>
				</div>
			</div>
			<div className={'field field__source'}>
				<p className={'small'}>{data.source}</p>
			</div>
			<div className={'field field__service'}>
				<img src={ServiceIcon} alt={'service-icon'} className={'small-icon'} />
				<div>
					<p className={'medium strong'}>{`${
						data.service.tcp ? 'TCP' : 'UDP'
					}/${data.service.port}`}</p>
					<p className={'small'}>{`(${data.service.protocol})`}</p>
				</div>
			</div>
			<div className={'vertical-divider vertical-divider--big'} />
			<div className={'field field__application'}>
				<img
					src={ApplicationIcon}
					alt={'application-icon'}
					className={'small-icon'}
				/>
				<p className={'medium strong'}>{data.application}</p>
			</div>
			<div className={'field field__destination'}>
				<p className={'small'}>{data.destination}</p>
			</div>
			<div className={'field field__actions'}>
				{data.actions.map(action => (
					<div className={'action'} key={`action-item-index-${action}`}>
						<img
							src={getIconForAction(action)}
							alt={'icon'}
							className={'small-icon'}
						/>
						<p className={'medium'}>{action}</p>
					</div>
				))}
			</div>
			<div className={'field field__alert'}>
				{data.alert ? (
					<React.Fragment>
						<img src={ThreatIcon} alt={'alert-icon'} className={'small-icon'} />
						<p className={'medium'}>{data.alert}</p>
					</React.Fragment>
				) : (
					<p className={'strong'}>-</p>
				)}
			</div>
			<div className={'field field__status'}>
				<img src={status.icon} alt={'status-icon'} className={'small-icon'} />
				<p className={'medium'}>{status.name}</p>
			</div>
		</div>
	)
}

ReportsTableItem.propTypes = {
	data: PropTypes.object.isRequired
}
