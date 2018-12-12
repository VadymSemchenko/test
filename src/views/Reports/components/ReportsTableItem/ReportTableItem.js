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

function TableItemContainer({ children }) {
	return <div className={'reports-table-item item'}>{children}</div>
}

function Field({ children, extraClass = '' }) {
	return <div className={`field ${extraClass}`}>{children}</div>
}

function ResponsiveField({ children, title, extraClass = '' }) {
	return (
		<div className={`field ${extraClass}`}>
			<p className={'field__title'}>{title}</p>
			<div className={'field__content'}>{children}</div>
		</div>
	)
}

function PolicyField({ date }) {
	return (
		<React.Fragment>
			<img
				src={ArrowLeftBottomIcon}
				alt={'arrow-icon'}
				className={'small-icon'}
			/>
			<img src={PolicyIcon} alt={'policy-icon'} className={'small-icon'} />
			<div>
				<p className={'medium'}>{moment(date).format('DD/MM/YYYY')}</p>
				<p className={'medium'}>{moment(date).format('HH:mm:ss')}</p>
			</div>
		</React.Fragment>
	)
}

function SmallTextField({ text }) {
	return <p className={'small'}>{text}</p>
}

function ServiceField({ service }) {
	return (
		<React.Fragment>
			<img src={ServiceIcon} alt={'service-icon'} className={'small-icon'} />
			<div>
				<p className={'medium strong'}>{`${service.tcp ? 'TCP' : 'UDP'}/${
					service.port
				}`}</p>
				<p className={'small'}>{`(${service.protocol})`}</p>
			</div>
		</React.Fragment>
	)
}

function ApplicationField({ application }) {
	return (
		<React.Fragment>
			<img
				src={ApplicationIcon}
				alt={'application-icon'}
				className={'small-icon'}
			/>
			<p className={'medium strong'}>{application}</p>
		</React.Fragment>
	)
}

function ActionsField({ actions }) {
	return (
		<React.Fragment>
			{actions.map(action => (
				<div className={'action'} key={`action-item-index-${action}`}>
					<img
						src={getIconForAction(action)}
						alt={'icon'}
						className={'small-icon'}
					/>
					<p className={'medium'}>{action}</p>
				</div>
			))}
		</React.Fragment>
	)
}

function AlertField({ alert }) {
	return (
		<React.Fragment>
			{alert ? (
				<React.Fragment>
					<img src={ThreatIcon} alt={'alert-icon'} className={'small-icon'} />
					<p className={'medium'}>{alert}</p>
				</React.Fragment>
			) : (
				<p className={'strong'}>-</p>
			)}
		</React.Fragment>
	)
}

function StatusField({ status }) {
	return (
		<React.Fragment>
			<img src={status.icon} alt={'status-icon'} className={'small-icon'} />
			<p className={'medium'}>{status.name}</p>
		</React.Fragment>
	)
}

export default function ReportsTableItem({ data, responsive = false }) {
	const status = STATUS.find(s => s.slug === data.status)

	const WrapperComponent = responsive ? ResponsiveField : Field
	return (
		<TableItemContainer>
			<WrapperComponent title={'Policy'} extraClass={'field__policy'}>
				<PolicyField date={data.date} />
			</WrapperComponent>
			<WrapperComponent title={'Source'} extraClass={'field__source'}>
				<SmallTextField text={data.source} />
			</WrapperComponent>
			<WrapperComponent title={'Service'} extraClass={'field__service'}>
				<ServiceField service={data.service} />
			</WrapperComponent>
			<WrapperComponent title={'Application'} extraClass={'field__application'}>
				<ApplicationField application={data.application} />
			</WrapperComponent>
			<WrapperComponent title={'Destination'} extraClass={'field__destination'}>
				<SmallTextField text={data.destination} />
			</WrapperComponent>
			<WrapperComponent title={'Actions'} extraClass={'field__actions'}>
				<ActionsField actions={data.actions} />
			</WrapperComponent>
			<WrapperComponent title={'Alert'} extraClass={'field__alert'}>
				<AlertField alert={data.alert} />
			</WrapperComponent>
			<WrapperComponent title={'Status'} extraClass={'field__status'}>
				<StatusField status={status} />
			</WrapperComponent>
		</TableItemContainer>
	)
}

StatusField.propTypes = {
	status: PropTypes.object.isRequired
}

AlertField.propTypes = {
	alert: PropTypes.any.isRequired
}

ActionsField.propTypes = {
	actions: PropTypes.array.isRequired
}

ApplicationField.propTypes = {
	application: PropTypes.string.isRequired
}

ServiceField.propTypes = {
	service: PropTypes.object.isRequired
}

ResponsiveField.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	extraClass: PropTypes.string
}

Field.propTypes = {
	children: PropTypes.element.isRequired,
	extraClass: PropTypes.string
}

SmallTextField.propTypes = {
	text: PropTypes.string.isRequired
}

PolicyField.propTypes = {
	date: PropTypes.string.isRequired
}

TableItemContainer.propTypes = {
	children: PropTypes.array.isRequired
}

ReportsTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired
}
