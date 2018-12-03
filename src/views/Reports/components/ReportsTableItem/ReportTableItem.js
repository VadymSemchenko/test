import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
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
			<div>
				<img className={'small-icon'} />
				<img className={'small-icon'} />
				<p className={'medium'}>{moment(data.date).format('MM/DD/YYYY')}</p>
				<p className={'medium'}>{moment(data.date).format('HH:mm:ss')}</p>
			</div>
			<div>
				<p className={'small'}>{data.source}</p>
			</div>
			<div>
				<img className={'small-icon'} />
				<p className={'medium'}>{`${data.service.tcp ? 'TCP' : 'UDP'}/${
					data.service.port
				}`}</p>
				<p className={'small'}>{`(${data.service.protocol})`}</p>
			</div>
			<div>
				<img className={'small-icon'} />
				<p className={'medium'}>{data.application}</p>
			</div>
			<div>
				<p className={'small'}>{data.destination}</p>
			</div>
			<div>
				{data.actions.map(action => (
					<div key={`action-item-index-${action}`}>
						<img className={'small-icon'} />
						<p className={'medium'}>{action}</p>
					</div>
				))}
			</div>
			<div>
				{data.alert ? (
					<div>
						<img className={'small-icon'} />
						<p className={'medium'}>{data.alert}</p>
					</div>
				) : (
					<p>-</p>
				)}
			</div>
			<div>
				<img className={'small-icon'} />
				<p className={'medium'}>{status.name}</p>
			</div>
		</div>
	)
}

// ReportsTableItem.propTypes = {
//   data: PropTypes.object.shape({
//     id: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     policy: PropTypes.string,
//     source: PropTypes.string.isRequired,
//     service: PropTypes.object.shape({
//       protocol: PropTypes.string.isRequired,
//       port: PropTypes.number.isRequired,
//       tcp: PropTypes.bool.isRequired,
//       status: PropTypes.string
//     }).isRequired,
//     application: PropTypes.string.isRequired,
//     destination: PropTypes.string.isRequired,
//     actions: PropTypes.arrayOf(PropTypes.string).isRequired(),
//     alert: PropTypes.string,
//     status: PropTypes.string.isRequired
//   }).isRequired
// }
