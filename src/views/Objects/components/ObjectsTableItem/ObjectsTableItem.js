import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import ActiveIcon from '../../../../assets/img/PNG/Acreto_Icon 20.png'

import { getIconForRegionName } from '../../../../variables/Icons'

import './objects-table-item.scss'

// const STATUS = [
//   { slug: 'connected', name: 'Connected', icon: ActiveIcon },
// ]

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
		<div className={'objectinfo'}>
			<div className={'objectinfo__button'}>{data.id}</div>
			<p className={'objectinfo__title medium strong'}>{data.name}</p>
			<div className={'objectinfo__type-container'}>
				<img src={ServiceIcon} alt={'type-icon'} className={'small-icon'} />
				<p className={'medium'}>{`${data.type} / ${data.category}`}</p>
			</div>
		</div>
	)
}

function SmallTextField({ text }) {
	return <p className={'small'}>{text}</p>
}

function TextField({ text, strong, size }) {
	return <p className={`${size} ${strong ? 'strong' : ''}`}>{text}</p>
}

function NspInfo({ data }) {
	return (
		<React.Fragment>
			<div className={'primary-container'}>
				<img
					src={getIconForRegionName(data[0].name)}
					alt={'region-icon'}
					className={'region-icon'}
				/>
				<div className={'divider big'} />
				<div className={'flex-column'}>
					<p className={'small strong nsp-name'}>{data[0].name}</p>
					<div className={'flex-row'}>
						<p className={'small strong'}>
							{data[0].ping} <span className={'unit'}>ms</span>
						</p>
						<div className={'divider small'} />
						<p className={'small strong'}>
							{`${data[0].loss}% `}
							<span className={'unit'}>Loss</span>
						</p>
					</div>
				</div>
			</div>
			<p className={'more'}>{data.length > 1 && `+${data.length - 1} more`}</p>
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
	// const status = STATUS.find(s => s.slug === data.status)
	return (
		<div className={'statusinfo'}>
			<div className={'centered-row'}>
				<img src={ActiveIcon} className={'small-icon'} alt={'status-icon'} />
				<p className={'medium capitalize strong'}>{data.status}</p>
			</div>
			<p className={'text medium'}>Last change</p>
			<p className={'text medium strong '}>
				{moment(data.lastChange).fromNow()}
			</p>
		</div>
	)
}

export default function ObjectTableItem({ data, responsive = false }) {
	const WrapperComponent = responsive ? ResponsiveField : Field
	return (
		<TableItemContainer>
			<WrapperComponent title={'Object'} extraClass={'field__info'}>
				<BasicObjectInfo data={data} />
			</WrapperComponent>
			<WrapperComponent title={'Profile Group'} extraClass={'field__profile'}>
				<TextField
					text={data.profile_group.name}
					size={'medium'}
					strong={true}
				/>
			</WrapperComponent>
			<WrapperComponent title={'Primary NSP'} extraClass={'field__nsp'}>
				<NspInfo data={data.nsps} />
			</WrapperComponent>
			<WrapperComponent title={'Status'} extraClass={'field__status'}>
				<StatusInfo data={data} />
			</WrapperComponent>
		</TableItemContainer>
	)
}

NspInfo.propTypes = {
	data: PropTypes.object.isRequired
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

StatusInfo.propTypes = {
	data: PropTypes.object.isRequired
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
