import PropTypes from 'prop-types'
import React from 'react'
import Modal from 'react-modal'
import './wedge-modal.scss'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		width: '60%',
		minWidth: '350px',
		maxWidth: '100%',
		maxHeight: '600px',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '0px',
		border: '0px'
	},
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
}

export default function WedgeModal({
	isOpen,
	onClose,
	afterOpen,
	children,
	footer,
	additionalAction = false,
	title = 'Example title'
}) {
	return (
		<Modal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={false}
			onAfterOpen={afterOpen}
			onRequestClose={onClose}
			style={customStyles}
		>
			<div className={'wedge-modal'}>
				<div className={'wedge-modal__header header'}>
					<p className={'header__title'}>{title}</p>
					<div className={'header__actions-container'}>
						{additionalAction && (
							<i
								className={`header__action ${additionalAction.icon}`}
								onClick={additionalAction.callback}
							/>
						)}
						<i className={'header__close pe-7s-close'} onClick={onClose} />
					</div>
				</div>
				<div className={'wedge-modal__content'}>
					{children}
					{footer && <div className={'wedge-modal__footer'}>{footer}</div>}
				</div>
			</div>
		</Modal>
	)
}

WedgeModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	afterOpen: PropTypes.func,
	children: PropTypes.element,
	footer: PropTypes.element,
	title: PropTypes.string,
	additionalAction: PropTypes.object
}
