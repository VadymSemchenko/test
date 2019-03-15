import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import { POLICY_TABLE_FIELDS } from '../../enums'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import CreateNewService from '../Modals/CreateNewService'
import NewPolicySurvey from '../Modals/NewPolicySurvey'
import PolicyTableItem from './components/PolicyTableItem/PolicyTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import {
	createPolicy,
	fetchPolicies,
	updatePolicy,
	createService
} from './scenario-actions'
import './security.scss'

Modal.setAppElement('#modal-root')

class Security extends Component {
	state = {
		createModalOpened: true,
		detailModalOpened: false,
		editModalOpened: false,
		serviceModalOpened: false,
		detailsOf: {}
	}

	onEditClick = () => {
		this.openEditModal()
	}

	openModal = () => {
		this.setState({ createModalOpened: true })
	}

	openDetailsModal = item => {
		this.setState({
			detailsOf: item,
			detailModalOpened: true
		})
	}

	closeDetailsModal = () => {
		this.setState({
			detailModalOpened: false
		})
	}

	openServiceCreateModal = () => {
		this.setState({
			serviceModalOpened: true
		})
	}

	closeServiceCreateModal = () => {
		this.setState({
			serviceModalOpened: false
		})
	}

	openEditModal = item => {
		this.setState({
			detailsOf: item || this.state.detailsOf,
			keepDetailsOpened: this.state.detailModalOpened,
			detailModalOpened: false,
			editModalOpened: true
		})
	}

	closeEditModal = () => {
		this.setState({
			editModalOpened: false,
			detailModalOpened: this.state.keepDetailsOpened,
			keepDetailsOpened: false
		})
	}

	closeCreateModal = () => {
		this.setState({
			createModalOpened: false
		})
	}

	componentDidMount() {
		this.props.fetchPolicies()
	}

	renderDetailModal = () => {
		return null //<Details data={ this.state.detailsOf }/>
	}

	renderEditModal = () => {
		return null //<Survey onFinish={ this.onEdit } item={ this.state.detailsOf } edit/>
	}

	renderCreationModal = () => {
		return <NewPolicySurvey onFinish={newPolicy => this.onAdd(newPolicy)} />
	}

	onAdd = entity => {
		this.props.createPolicy(entity)
		this.closeCreateModal()
	}

	onEdit = entity => {
		this.props.updatePolicy(entity)
		this.closeEditModal()
	}

	onCreateService = service => {
		this.props.createService(service)
		this.closeServiceCreateModal()
	}

	renderPolicies = matches => {
		const { items } = this.props
		return items.map((item, index) => (
			<PolicyTableItem
				key={`policy-table-item-${item.id}-${item.name}`}
				responsive={matches}
				data={item}
				index={index + 1}
				onEdit={() => this.openEditModal(item)}
				onDetails={() => this.openDetailsModal(item)}
				onNewService={this.openServiceCreateModal}
			/>
		))
	}

	render() {
		return (
			<div className="content policies">
				<div className={'policies__search-bar'}>
					<SearchBar />
				</div>
				<AddButton onClick={this.openModal}>Add New Policy</AddButton>
				<Table.Container root={'policies'}>
					<Table.Content
						root={'policies'}
						headerComponent={<Table.Header items={POLICY_TABLE_FIELDS} />}
						renderItems={this.renderPolicies}
					/>
				</Table.Container>
				{this.props.isLoading && (
					<div className={'loader-container'}>
						<Loader />
					</div>
				)}
				<WedgeModal
					isOpen={this.state.createModalOpened}
					onClose={this.closeCreateModal}
					title={'Create new policy'}
					size={'big'}
				>
					{this.renderCreationModal()}
				</WedgeModal>
				<WedgeModal
					isOpen={this.state.detailModalOpened}
					onClose={this.closeDetailsModal}
					additionalAction={{
						icon: 'pe-7s-config',
						callback: this.onEditClick
					}}
					title={`${this.state.detailsOf.name} - Details`}
				>
					{this.renderDetailModal()}
				</WedgeModal>
				<WedgeModal
					isOpen={this.state.editModalOpened}
					onClose={this.closeEditModal}
					title={`${this.state.detailsOf.name} - Edit`}
				>
					{this.renderEditModal()}
				</WedgeModal>
				<WedgeModal
					size={'small'}
					isOpen={this.state.serviceModalOpened}
					onClose={this.closeServiceCreateModal}
					title={'Create new service'}
				>
					<CreateNewService onFinish={this.onCreateService} />
				</WedgeModal>
			</div>
		)
	}
}

Security.propTypes = {
	fetchPolicies: PropTypes.func.isRequired,
	createPolicy: PropTypes.func.isRequired,
	updatePolicy: PropTypes.func.isRequired,
	createService: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
}

Security.defaultProps = {
	items: []
}

const loadingSelector = createLoadingSelector(['FETCHING_POLICIES'])
const errorSelector = createErrorMessageSelector(['FETCHING_POLICIES'])

const mapStateToProps = state => {
	return {
		items: policiesSelector(state),
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const policiesSelector = state => {
	const ecosystem = state.ecosystems.currentEcosystem
	if (ecosystem) {
		return state.policies[ecosystem.uuid]
			? state.policies[ecosystem.uuid].policies
			: []
	}

	return []
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPolicies: () => dispatch(fetchPolicies()),
		createPolicy: (entity, type) => dispatch(createPolicy(entity, type)),
		updatePolicy: entity => dispatch(updatePolicy(entity)),
		createService: service => dispatch(createService(service))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Security)
