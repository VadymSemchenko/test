import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { COG, INCREASE_ARROW, INFO, TYPE_IOT } from '../../../../assets/Icons'
import Translator from '../../../../utils/enumTranslator'

import {
	getArrow,
	getIconForRegionName,
	getIconForStatus
} from '../../../../variables/Icons'

import './objects-table-item.scss'

function TableItemContainer({ children, active = false }) {
	return (
		<div className={`objects-table-item item ${active ? 'active' : ''}`}>
			{children}
		</div>
	)
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

function BasicObjectInfo({ data, onClick }) {
	const type = Translator.type(data.type)
	const category = Translator.category(data.category)
	return (
		<div className={'objectinfo'}>
			<p className={'objectinfo__title normal strong'}>{data.name}</p>
			<div className={'objectinfo__type-container'}>
				<img src={TYPE_IOT} alt={'type-icon'} className={'small-icon'} />
				<p className={'normal'}>{`${category.label} / ${type.label}`}</p>
			</div>
			<div className={'objectinfo__button'} onClick={onClick}>
				{data.id}
				<img src={INFO} alt={'info-icon'} className={'small-icon'} />
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

function NspInfo({ data, showAll = false, onExpand }) {
	const limitedData = showAll ? data : [data[0]]
	return (
		<React.Fragment>
			{limitedData.map((d, index) => (
				<div key={index} className={'single-nsp'}>
					{index === 0 && <p className={'normal nsp-text'}>Primary NSP</p>}
					{index === 1 && (
						<p className={'normal nsp-text nsp-text-secondary'}>
							Secondary NSP
						</p>
					)}
					<div key={`nsp-info-index-${index}`} className={'primary-container'}>
						<img
							src={getArrow(d.status === 'good')}
							className={'arrow-status'}
							alt={'arrow-status'}
						/>
						<img
							src={getIconForRegionName(d.name, d.status === 'good')}
							alt={'region-icon'}
							className={'region-icon'}
						/>
						<div className={'divider big'} />
						<div className={'flex-column'}>
							<p className={'semi-strong nsp-name'}>{d.name}</p>
							<div className={'flex-row'}>
								<p className={'nsp-values'}>
									{d.ping} <span className={'unit'}>ms</span>
								</p>
								<div className={'divider small'} />
								<p className={'nsp-values'}>
									{`${d.loss}% `}
									<span className={'unit'}>Loss</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
			{!showAll && (
				<p className={'more'} onClick={onExpand}>
					{data.length > 1 && `+${data.length - 1} more`}
				</p>
			)}
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
	return (
		<div className={'statusinfo'}>
			<div className={'centered-row status-text-container'}>
				<img
					src={getIconForStatus(data.status)}
					className={`tiny-icon ${
						data.status === 'connected' ? 'small-icon' : 'larger-icon'
					}`}
					alt={'status-icon'}
				/>
				<p className={'normal capitalize status'}>{data.status}</p>
			</div>
			<p className={'text grayish last-change-label'}>Last change</p>
			<div className={'centered-row space-above-8'}>
				<img
					src={INCREASE_ARROW}
					className={'increase-arrow'}
					alt={'increase-arrow'}
				/>
				<p className={'status no-margin'}>
					{moment(data.lastChange).fromNow()}
				</p>
			</div>
		</div>
	)
}

export default class ObjectTableItem extends React.PureComponent {
	state = {
		showAll: false
	}

	onClick = () => {
		this.setState({
			showAll: !this.state.showAll
		})
	}

	render() {
		const { data, responsive = false, onDetails, onEdit } = this.props
		const WrapperComponent = responsive ? ResponsiveField : Field
		return (
			<TableItemContainer active={this.state.showAll}>
				<WrapperComponent title={'Object'} extraClass={'field__info'}>
					<BasicObjectInfo data={data} onClick={onDetails} />
				</WrapperComponent>
				<WrapperComponent title={'Profile Group'} extraClass={'field__profile'}>
					<TextField
						text={Translator.profileGroup(data.profileGroup).label}
						size={'normal'}
						strong={false}
					/>
				</WrapperComponent>
				<WrapperComponent title={'Primary NSP'} extraClass={'field__nsp'}>
					<NspInfo
						data={data.nsps}
						showAll={this.state.showAll}
						onExpand={this.onClick}
					/>
				</WrapperComponent>
				<WrapperComponent title={'Status'} extraClass={'field__status'}>
					<StatusInfo data={data} />
				</WrapperComponent>
				<WrapperComponent extraClass={'field__expand'}>
					<i
						className={`pe-7s-angle-down ${this.state.showAll && 'active'}`}
						onClick={this.onClick}
					/>
				</WrapperComponent>
				<WrapperComponent extraClass={'field__edit'}>
					<img src={COG} alt={'edit-icon'} onClick={onEdit} />
				</WrapperComponent>
			</TableItemContainer>
		)
	}
}

NspInfo.propTypes = {
	data: PropTypes.array.isRequired,
	showAll: PropTypes.bool,
	onExpand: PropTypes.func.isRequired
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

TextField.defaultProps = {
	text: ''
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
	data: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
}

TableItemContainer.propTypes = {
	children: PropTypes.array.isRequired,
	active: PropTypes.bool
}

ObjectTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired,
	onDetails: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired
}
