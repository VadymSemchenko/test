import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import UserIcon from '../../../../assets/img/PNG/Acreto_Icon 04.png'
import cs from 'classnames'
import './ecosystem-item.scss'

function NspItem({ nsp }) {
	return (
		<div className={'nsp'}>
			<img alt={nsp.name} className={'nsp__image'} />
			<p className={'nsp__name'}>{nsp.name}</p>
		</div>
	)
}

export default function EcosystemItem({ ecosystem, onClick }) {
	const handleClick = () => {
		if (!ecosystem.disabled) {
			onClick()
		}
	}

	const renderNsps = nsps => {
		if (nsps.length <= 4) {
			return (
				<React.Fragment>
					{nsps.map((nsp, index) => (
						<NspItem key={`nsps-list-index-${index}`} nsp={nsp} />
					))}
					{Array(4 - nsps.length)
						.fill(4 - nsps.length)
						.map((i, index) => (
							<div className={'empty'} key={`nsps-list-empty-index-${index}`} />
						))}
				</React.Fragment>
			)
		}
		if (nsps.length > 4) {
			const hiddenElementsAmount = nsps.length - 3
			return (
				<React.Fragment>
					{nsps.splice(0, 3).map((nsp, index) => (
						<NspItem key={`nsps-list-index-${index}`} nsp={nsp} />
					))}
					<div className={'nsp__counter'}>
						<p>{`+${hiddenElementsAmount}`}</p>
					</div>
				</React.Fragment>
			)
		}
	}

	return (
		<div
			onClick={handleClick}
			className={cs({ 'ecosystem-item': true, disabled: ecosystem.disabled })}
		>
			<div className={'item-header'}>
				<div className={'item-header__caption'}>
					<h2 className={'item-header__name'}>{ecosystem.name}</h2>
					<p className={'item-header__subtitle'}>
						{moment(ecosystem.lastSeen).fromNow()}
					</p>
				</div>
			</div>
			<div className={'item-content'}>
				<p className={'title'}>Associated NSP</p>
				<div className={'nsp__container'}>
					{renderNsps(ecosystem.nsps || [])}
				</div>
				<div className={'owner-container'}>
					<div className={'owner'}>
						<img src={UserIcon} alt={'user-icon'} className={'owner__icon'} />
						<div className={'divider'} />
						<p className={'owner__name'}>{ecosystem.owner.fullName}</p>
					</div>
				</div>
				<div className={'charts-container'}>
					<div className={'utilization'}>
						<div className={'abs-container'}>
							<img alt={'utilization-chart'} className={'chart'} />
							<div className={'value-container'}>
								<p className={'value'}>{ecosystem.utilization || 3}</p>
							</div>
						</div>
						<p>Utilization</p>
					</div>
					<div className={'divider'} />
					<div className={'threat'}>
						<div className={'abs-container'}>
							<img alt={'threat-chart'} className={'chart'} />
							<div className={'value-container'}>
								<p className={'value'}>{ecosystem.threat || 9}</p>
							</div>
						</div>
						<p>Threat</p>
					</div>
					<div className={'divider'} />
					<div className={'down'}>
						<div className={'abs-container'}>
							<img alt={'down-chart'} className={'chart'} />
							<div className={'value-container'}>
								<p className={'value'}>{ecosystem.down || '40%'}</p>
							</div>
						</div>
						<p>Down</p>
					</div>
				</div>
			</div>
		</div>
	)
}

NspItem.propTypes = {
	nsp: PropTypes.object.isRequired
}

EcosystemItem.propTypes = {
	ecosystem: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
}
