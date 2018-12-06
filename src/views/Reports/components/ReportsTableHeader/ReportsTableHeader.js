import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import './reports-table-header.scss'

const FIELDS = [
	{ name: 'Policy', center: true },
	{ name: 'Source', center: true },
	{ name: 'Service', center: true },
	{ name: 'Application', center: true },
	{ name: 'Destination', center: true },
	{ name: 'Action', center: true },
	{ name: 'Alert', center: true },
	{ name: 'Status', center: true }
]

function ReportTableItem({ conf }) {
	if (conf.divider) {
		return <div className={`empty`} />
	}

	return (
		<div className={cx({ field: true, 'text-center': conf.center })}>
			{conf.name}
		</div>
	)
}

export default function ReportsTableHeader() {
	return (
		<div className={'reports-table-header header'}>
			{FIELDS.map((field, index) => (
				<ReportTableItem conf={field} key={`table-header-field-${index}`} />
			))}
		</div>
	)
}

ReportTableItem.propTypes = {
	conf: PropTypes.object.isRequired
}
