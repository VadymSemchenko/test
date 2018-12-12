import PropTypes from 'prop-types'
import React from 'react'
import UserIcon from '../../../../assets/img/PNG/Acreto_Icon 04.png'
import './ecosystem-item.scss'

function NspItem({ nsp }) {
	return (
		<div className={'nsp'}>
			<img alt={nsp.name} className={'nsp__image'} />
			<p className={'nsp__name'}>{nsp.name}</p>
		</div>
	)
}

export default function EcosystemItem() {
	const renderNsps = nsps => {
		if (nsps.length <= 4) {
			return (
				<React.Fragment>
					{nsps.map((nsp, index) => (
						<NspItem key={`nsps-list-index-${index}`} nsp={nsp} />
					))}
					{Array(4 - nsps.length)
						.fill(4 - nsps.length)
						.map(index => (
							<div
								className={'empty'}
								key={`nsps-list-empty- index-${index}`}
							/>
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

	const fakeNsps = [
		{
			name: 'us-west-1'
		},
		{
			name: 'eu-east-1'
		},
		{
			name: 'au-central-1'
		},
		{
			name: 'test-nsp-3'
		},
		{
			name: 'test-nsp-3'
		}
	]

	return (
		<div className={'ecosystem-item'}>
			<div className={'item-header'}>
				<div className={'item-header__caption'}>
					<h2 className={'item-header__name'}>Surveilance</h2>
					<p className={'item-header__subtitle'}>5 days ago</p>
				</div>
			</div>
			<div className={'item-content'}>
				<p className={'title'}>Associated NSP</p>
				<div className={'nsp__container'}>{renderNsps(fakeNsps)}</div>
				<div className={'owner-container'}>
					<div className={'owner'}>
						<img src={UserIcon} alt={'user-icon'} className={'owner__icon'} />
						<div className={'divider'} />
						<p className={'owner__name'}>Peter Anderson</p>
					</div>
				</div>
				<div className={'charts-container'}>
					<div className={'utilization'}>
						<img className={'chart'} />
						<p>Utilization</p>
					</div>
					<div className={'divider'} />
					<div className={'threat'}>
						<img className={'chart'} />
						<p>Threat</p>
					</div>
					<div className={'divider'} />
					<div className={'down'}>
						<img className={'chart'} />
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
	ecosystem: PropTypes.object.isRequired
}
