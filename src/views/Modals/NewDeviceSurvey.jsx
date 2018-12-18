import React from 'react'
import './modals.scss'

export default function NewObjectType() {
	return (
		<div className={'modal__content padded'}>
			<p className={'big'}>What type of object would you like to add?</p>
			<div className={'divider divider-horizontal'} />
			<div className={'option-container'}>
				<img className={'type-icon'} alt={'device-icon'} />
				<p className={'option medium'}>Device</p>
				<i className={'icon pe-7s-angle-right'} />
			</div>
			<div className={'divider divider-horizontal'} />
			<div className={'option-container'}>
				<img className={'type-icon'} alt={'device-icon'} />
				<p className={'option medium'}>Gateway</p>
				<i className={'icon pe-7s-angle-right'} />
			</div>
			<div className={'divider divider-horizontal'} />
			<div className={'option-container'}>
				<img className={'type-icon'} alt={'device-icon'} />
				<p className={'option medium'}>Address</p>
				<i className={'icon pe-7s-angle-right'} />
			</div>
		</div>
	)
}
