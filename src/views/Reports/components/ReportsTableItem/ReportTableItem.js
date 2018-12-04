import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import './reports-table-item.scss'

const STATUS = [
	{ slug: 'active', icon: '', name: 'Active' },
	{ slug: 'completed', icon: '', name: 'Completed' },
	{ slug: 'terminated', icon: '', name: 'Terminated' },
	{ slug: 'timeout', icon: '', name: 'Timed out' }
]

export default function ReportsTableItem({ data }) {
	const status = STATUS.find(s => s.slug === data.status)

	return (
		<div className={'reports-table-item item'}>
			<div className={'field field__policy'}>
				<img alt={'arrow-icon'} className={'small-icon'} />
				<img alt={'policy-icon'} className={'small-icon'} />
				<div>
					<p className={'medium'}>{moment(data.date).format('MM/DD/YYYY')}</p>
					<p className={'medium'}>{moment(data.date).format('HH:mm:ss')}</p>
				</div>
			</div>
			<div className={'field field__source'}>
				<p className={'small'}>{data.source}</p>
			</div>
			<div className={'field field__service'}>
				<img alt={'service-icon'} className={'small-icon'} />
				<div>
					<p className={'medium strong'}>{`${
						data.service.tcp ? 'TCP' : 'UDP'
					}/${data.service.port}`}</p>
					<p className={'small'}>{`(${data.service.protocol})`}</p>
				</div>
			</div>
			<div className={'vertical-divider vertical-divider--big'} />
			<div className={'field field__application'}>
				<img alt={'application-icon'} className={'small-icon'} />
				<p className={'medium strong'}>{data.application}</p>
			</div>
			<div className={'field field__destination'}>
				<p className={'small'}>{data.destination}</p>
			</div>
			<div className={'field field__actions'}>
				{data.actions.map(action => (
					<div className={'action'} key={`action-item-index-${action}`}>
						<img alt={'icon'} className={'small-icon'} />
						<p className={'medium'}>{action}</p>
					</div>
				))}
			</div>
			<div className={'field field__alert'}>
				{data.alert ? (
					<React.Fragment>
						<img alt={'alert-icon'} className={'small-icon'} />
						<p className={'medium'}>{data.alert}</p>
					</React.Fragment>
				) : (
					<p className={'strong'}>-</p>
				)}
			</div>
			<div className={'field field__status'}>
				<img alt={'status-icon'} className={'small-icon'} />
				<p className={'medium'}>{status.name}</p>
			</div>
		</div>
	)
}

ReportsTableItem.propTypes = {
	data: PropTypes.object.isRequired
}
