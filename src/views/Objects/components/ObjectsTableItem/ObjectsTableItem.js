import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import ActiveIcon from '../../../../assets/img/PNG/Acreto_Icon 20.png'
import Translator from '../../../../utils/enumTranslator'

import { getIconForRegionName } from '../../../../variables/Icons'

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
			<div className={'objectinfo__button'} onClick={onClick}>
				{data.id}
			</div>
			<p className={'objectinfo__title medium strong'}>{data.name}</p>
			<div className={'objectinfo__type-container'}>
				<img src={ServiceIcon} alt={'type-icon'} className={'small-icon'} />
				<p className={'medium'}>{`${category.label} / ${type.label}`}</p>
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

function NspInfo({ data, showAll = false }) {
	const limitedData = showAll ? data : [data[0]]
	return (
		<React.Fragment>
			{limitedData.map((d, index) => (
				<div key={`nsp-info-index-${index}`} className={'primary-container'}>
					<img
						src={getIconForRegionName(d.name)}
						alt={'region-icon'}
						className={'region-icon'}
					/>
					<div className={'divider big'} />
					<div className={'flex-column'}>
						<p className={'small strong nsp-name'}>{d.name}</p>
						<div className={'flex-row'}>
							<p className={'small strong'}>
								{d.ping} <span className={'unit'}>ms</span>
							</p>
							<div className={'divider small'} />
							<p className={'small strong'}>
								{`${d.loss}% `}
								<span className={'unit'}>Loss</span>
							</p>
						</div>
					</div>
				</div>
			))}
			{!showAll && (
				<p className={'more'}>
					{data.length > 1 && `+${data.length - 1} more`}
				</p>
			)}
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
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
		const { data, responsive = false, onDetails } = this.props
		const WrapperComponent = responsive ? ResponsiveField : Field
		return (
			<TableItemContainer active={this.state.showAll}>
				<WrapperComponent title={'Object'} extraClass={'field__info'}>
					<BasicObjectInfo data={data} onClick={onDetails} />
				</WrapperComponent>
				<WrapperComponent title={'Profile Group'} extraClass={'field__profile'}>
					<TextField
						text={Translator.profileGroup(data.profileGroup).label}
						size={'medium'}
						strong={true}
					/>
				</WrapperComponent>
				<WrapperComponent title={'Primary NSP'} extraClass={'field__nsp'}>
					<NspInfo data={data.nsps} showAll={this.state.showAll} />
				</WrapperComponent>
				<WrapperComponent title={'Status'} extraClass={'field__status'}>
					<StatusInfo data={data} />
				</WrapperComponent>
				<WrapperComponent extraClass={'field__expand'}>
					{this.state.showAll ? (
						<i className={'pe-7s-angle-up'} onClick={this.onClick} />
					) : (
						<i className={'pe-7s-angle-down'} onClick={this.onClick} />
					)}
				</WrapperComponent>
			</TableItemContainer>
		)
	}
}

NspInfo.propTypes = {
	data: PropTypes.array.isRequired,
	showAll: PropTypes.bool
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
	onDetails: PropTypes.func.isRequired
}
