import React from 'react'
import PropTypes from 'prop-types'
import './fetch-error-message.scss'

export default function FetchErrorMessage({
	text = 'Something went wrong',
	retryText = 'retry',
	onRetry
}) {
	return (
		<div className={`fetch-error-message`}>
			<div className={'fetch-error-message--container'}>
				<p className={'fetch-error-message--text'}>{text}</p>
				<div className={'fetch-error-message--retry-button'} onClick={onRetry}>
					{retryText}
				</div>
			</div>
		</div>
	)
}

FetchErrorMessage.propTypes = {
	text: PropTypes.string.isRequired,
	retryText: PropTypes.string.isRequired,
	onRetry: PropTypes.string.isRequired
}
