import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CustomButton from '../../components/CustomButton/CustomButton'
import FetchErrorMessage from '../../components/FetchErrorMessage/FetchErrorMessage'
import Loader from '../../components/Loader/Loader'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import CreateNewEcosystem from '../Modals/CreateNewEcosystem'
import AddEcosystem from './components/AddEcosystem/AddEcosystem'
import EcosystemItem from './components/EcosystemItem/EcosystemItem'
import PendingEcosystemItem from './components/PendingEcosystemItem/PendingEcosystemItem'
import './ecosystems.scss'
import {
	createEcosystem,
	fetchEcosystems,
	openEcosystem
} from './scenario-actions'

Modal.setAppElement('#modal-root')

class Ecosystems extends Component {
	state = {
		newEcosystemModalOpened: false
	}

	componentDidMount() {
		this.props.fetchEcosystems()
	}

	handleClick = ecosystem => {
		this.props.openEcosystem(ecosystem)
	}

	handleCloseModal = () => {
		this.setState({
			newEcosystemModalOpened: false
		})
	}

	handleOpenModal = () => {
		this.setState({
			newEcosystemModalOpened: true
		})
	}

	handleCreateEcosystem = entity => {
		this.setState({
			newEcosystemModalOpened: false
		})
		this.props.createEcosystem(entity)
	}

	renderLoader = () => {
		return (
			<div className={'loader-container'}>
				<Loader />
			</div>
		)
	}

	renderEcosystems = () => {
		const { ecosystems, createLoading } = this.props
		return (
			<div className={'ecosystems'}>
				<AddEcosystem onClick={this.handleOpenModal} />
				{createLoading && <PendingEcosystemItem />}
				{ecosystems.map((eco, index) => (
					<EcosystemItem
						ecosystem={eco}
						onClick={() => this.handleClick(eco)}
						key={`ecosystems-list-index-${index}`}
					/>
				))}
				<WedgeModal
					title={'Add New Ecosystem'}
					onClose={this.handleCloseModal}
					isOpen={this.state.newEcosystemModalOpened}
				>
					<CreateNewEcosystem onFinish={this.handleCreateEcosystem} />
				</WedgeModal>
			</div>
		)
	}

	render() {
		const { fetchLoading, error } = this.props
		return (
			<div>
				{error && (
					<div className={'error-container'}>
						<FetchErrorMessage
							text={error.message}
							onRetry={this.props.fetchEcosystems}
						/>
					</div>
				)}
				{fetchLoading ? this.renderLoader() : this.renderEcosystems()}
				<div className={'refresh-button'}>
					<CustomButton onClick={this.props.fetchEcosystems}>
						Refresh
					</CustomButton>
				</div>
			</div>
		)
	}
}

Ecosystems.defaultProps = {
	ecosystems: []
}

Ecosystems.propTypes = {
	fetchLoading: PropTypes.bool.isRequired,
	createLoading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	ecosystems: PropTypes.array.isRequired,
	fetchEcosystems: PropTypes.func.isRequired,
	openEcosystem: PropTypes.func.isRequired,
	createEcosystem: PropTypes.func.isRequired
}

const fetchLoadingSelector = createLoadingSelector(['FETCHING_ECOSYSTEMS'])
const createEcosystemLoadingSelector = createLoadingSelector([
	'CREATE_ECOSYSTEM'
])
const errorSelector = createErrorMessageSelector(['FETCHING_ECOSYSTEMS'])
const mapStateToProps = state => {
	return {
		fetchLoading: fetchLoadingSelector(state),
		createLoading: createEcosystemLoadingSelector(state),
		ecosystems: state.ecosystems.items,
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchEcosystems: () => dispatch(fetchEcosystems()),
		openEcosystem: ecosystem => dispatch(openEcosystem(ecosystem)),
		createEcosystem: ecosystem => dispatch(createEcosystem(ecosystem))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Ecosystems)
