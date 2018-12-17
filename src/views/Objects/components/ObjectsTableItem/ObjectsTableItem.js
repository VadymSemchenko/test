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

import { getIconForRegionName } from '../../../../variables/Icons'

import './objects-table-item.scss'

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
	return <div className={'objects-table-item item'}>{children}</div>
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

function BasicObjectInfo({ data }) {
	return (
		<React.Fragment>
			<div className={'objectinfo__button'}>
				{data.id}
			</div>
			<p className={'objectinfo__title medium strong'}>{ data.name }</p>
			<div className={'objectinfo__type-container'}>
        <img src={ServiceIcon} alt={'type-icon'} className={'small-icon'} />
				<p className={'medium'}>{`${data.type} / ${data.category}`}</p>
			</div>
		</React.Fragment>
	)
}

function SmallTextField({ text }) {
  return <p className={'small'}>{text}</p>
}

function TextField({ text, strong, size }) {
  return <p className={`${size} ${strong ? 'strong': ''}`}>{text}</p>
}

function NspInfo({ data }) {
	return (
		<React.Fragment>
			<div className={'primary-container'}>
        <img src={getIconForRegionName(data[0].name)} alt={'region-icon'} className={'region-icon'} />
				<div className={'divider big'}/>
				<div className={'flex-column'}>
					<p className={'small strong nsp-name'}>{ data[0].name }</p>
					<div className={'flex-row'}>
						<p className={'small strong'}>{data[0].ping} <span className={'unit'}>ms</span></p>
						<div className={'divider small'}/>
						<p className={'small strong'}>{`${data[0].loss}% `}<span className={'unit'}>Loss</span></p>
					</div>
				</div>
			</div>
			<p className={'more'}>{ data.length > 1 && `+${data.length - 1} more`}</p>
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

export default function ObjectTableItem({ data, responsive = false }) {
	const status = STATUS.find(s => s.slug === data.status)

	console.log(data.profile_group)
	const WrapperComponent = responsive ? ResponsiveField : Field
	return (
		<TableItemContainer>
			<WrapperComponent title={'Object'} extraClass={'field__info'}>
				<BasicObjectInfo data={data}/>
			</WrapperComponent>
			<WrapperComponent title={'Profile Group'} extraClass={'field__profile'}>
        <TextField text={data.profile_group.name} size={'medium'} strong={true}/>
			</WrapperComponent>
			<WrapperComponent title={'Primary NSP'} extraClass={'field__nsp'}>
        <NspInfo data={data.nsps}/>
			</WrapperComponent>
			<WrapperComponent title={'Application'} extraClass={'field__application'}>
        <BasicObjectInfo data={data}/>
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

NspInfo.propTypes = {
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
TextField.propTypes = {
  text: PropTypes.string.isRequired,
	strong: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium', 'big'])
}

BasicObjectInfo.propTypes = {
	data: PropTypes.string.isRequired
}

TableItemContainer.propTypes = {
	children: PropTypes.array.isRequired
}

ObjectTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired
}
