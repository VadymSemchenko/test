import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { INFO } from '../../../../assets/Icons'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import ApplicationIcon from '../../../../assets/img/PNG/Acreto_Icon 17.png'
import AddButton from '../../../../components/AddButton/AddButton'
import Form from '../../../../components/Form/Form'
import Translator from '../../../../utils/enumTranslator'

import {
	getArrow,
	getIconForRegionName,
	getIconForStatus
} from '../../../../variables/Icons'

import './policy-table-item.scss'

function TableItemContainer({ children, active = false }) {
	return (
		<div className={`policy-table-item item ${active ? 'active' : ''}`}>
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
	const expiryType = Translator.expirationType(data.expiry.type)
	return (
		<div className={'policyinfo'}>
			<div className={'policyinfo__button'} onClick={onClick}>
				{data.id}
				<img src={INFO} alt={'info-icon'} className={'small-icon'} />
			</div>
			<p className={'policyinfo__title normal strong'}>{data.name}</p>
			<div className={'policyinfo__time-container'}>
				{/*<img src={ TYPE_IOT } alt={ 'type-icon' } className={ 'small-icon' }/>*/}
				<p className={'medium'}>
					{moment(data.expiry.date).format('DD/MM/YYYY')}
				</p>
				<div className={'divider'} />
				<p className={`medium expiry ${expiryType.label}`}>
					{expiryType.label}
				</p>
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
							<p className={'small strong nsp-name'}>{d.name}</p>
							<div className={'flex-row'}>
								<p className={'small'}>
									{d.ping} <span className={'unit'}>ms</span>
								</p>
								<div className={'divider small'} />
								<p className={'small'}>
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

class ServiceField extends React.PureComponent {
	state = {
		service: {}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.options.length !== this.props.options.length) {
			const lastOption = this.props.options[this.props.options.length - 1]
			this.setState({
				service: {
					value: lastOption.id,
					label: `${lastOption.protocol}/${lastOption.port} (${
						lastOption.name
					})`
				}
			})
		}
	}

	onServiceChange = newService => {
		if (newService.value === -1) {
			this.props.onCreateNew()
		} else {
			this.setState({
				service: newService
			})
		}
	}

	render() {
		const { services, options } = this.props
		return (
			<React.Fragment>
				{services.map((service, index) => {
					return (
						<div
							className={'single-service'}
							key={`services-index-${index}-${service.id}`}
						>
							<img
								src={ServiceIcon}
								alt={'service-icon'}
								className={'small-icon'}
							/>
							<div>
								<p className={'medium strong'}>{`${
									service.tcp ? 'TCP' : 'UDP'
								}/${service.port}`}</p>
								<p className={'small'}>{`(${service.protocol})`}</p>
							</div>
						</div>
					)
				})}
				<Form.Group full>
					<div className={'flex-row baseline'}>
						<Form.Select
							value={this.state.service}
							onChange={this.onServiceChange}
							placeholder={'Service'}
							options={[
								...options.map(o => ({
									value: o.id,
									label: `${o.protocol}/${o.port} (${o.name})`
								})),
								{ value: -1, label: 'Create new service' }
							]}
						/>
						<AddButton className={'space-left'} />
					</div>
				</Form.Group>
			</React.Fragment>
		)
	}
}

const ConnectedServiceField = connect(
	state => ({
		options: state.ecosystems.dictionaries.services
	}),
	null
)(ServiceField)

function ApplicationField({ applications }) {
	return (
		<React.Fragment>
			{applications.map(application => {
				return (
					<div
						className={'single-application'}
						key={`application-index-${application.id}`}
					>
						<img
							src={ApplicationIcon}
							alt={'application-icon'}
							className={'small-icon'}
						/>
						<p className={'medium strong'}>{application.name}</p>
					</div>
				)
			})}
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
	return (
		<div className={'statusinfo'}>
			<div className={'centered-row status-text-container'}>
				<img
					src={getIconForStatus(data.status)}
					className={'tiny-icon'}
					alt={'status-icon'}
				/>
				<p className={'normal capitalize'}>{data.status}</p>
			</div>
			<p className={'text medium grayish space-above-8'}>Last change</p>
			<p className={'text medium'}>{moment(data.lastChange).fromNow()}</p>
		</div>
	)
}

export default class PolicyTableItem extends React.PureComponent {
	state = {
		showAll: false
	}

	onClick = () => {
		this.setState({
			showAll: !this.state.showAll
		})
	}

	render() {
		const {
			data,
			responsive = false,
			onDetails,
			onNewService,
			index = 0
		} = this.props
		const WrapperComponent = responsive ? ResponsiveField : Field
		return (
			<TableItemContainer active={this.state.showAll}>
				<div className={'policy__counter'}>
					<span>{index}</span>
				</div>
				<WrapperComponent title={'Policy'} extraClass={'field__info'}>
					<BasicObjectInfo data={data} onClick={onDetails} />
				</WrapperComponent>
				<WrapperComponent title={'Source'} extraClass={'field__source'}>
					<SmallTextField text={data.source} />
				</WrapperComponent>
				<WrapperComponent title={'Service'} extraClass={'field__service'}>
					<ConnectedServiceField
						services={data.services}
						onCreateNew={onNewService}
					/>
				</WrapperComponent>
				<WrapperComponent
					title={'Application'}
					extraClass={'field__application'}
				>
					<ApplicationField applications={data.applications} />
				</WrapperComponent>
				<WrapperComponent
					title={'Destination'}
					extraClass={'field__destination'}
				>
					<SmallTextField text={data.destination} />
				</WrapperComponent>
				<WrapperComponent title={'Actions'} extraClass={'field__action'}>
					<p>Not implemented</p>
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

ServiceField.propTypes = {
	services: PropTypes.array.isRequired,
	onCreateNew: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
}

ApplicationField.propTypes = {
	applications: PropTypes.array.isRequired
}

PolicyTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired,
	onDetails: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	onNewService: PropTypes.func.isRequired
}
