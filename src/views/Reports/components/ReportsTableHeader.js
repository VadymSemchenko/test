import React from 'react'
import './reports-table-header.scss'

export default function ReportsTableHeader() {
	return (
		<div className={'reports-table-header header'}>
			<div>Policy</div>
			<div>Source</div>
			<div>Service</div>
			<div>Application</div>
			<div>Destination</div>
			<div>Action</div>
			<div>Alert</div>
			<div>Status</div>
		</div>
	)
}
