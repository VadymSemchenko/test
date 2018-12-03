import React from 'react'
import './reports-table-header.scss'

const FIELDS = [
	'Policy',
	'Source',
	'Service',
	'Application',
	'Destination',
	'Action',
	'Alert',
	'Status'
]

export default function ReportsTableHeader() {
	return (
		<div className={'reports-table-header header'}>
			{FIELDS.map(field => (
				<div key={`table-header-field-${field}`}>{field}</div>
			))}
		</div>
	)
}
