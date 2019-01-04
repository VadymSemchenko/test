import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import AddressDetailsModal from '../Modals/AddressDetailsModal'
import DeviceDetailsModal from '../Modals/DeviceDetailsModal'
import GatewayDetailsModal from '../Modals/GatewayDetailsModal'
import NewAddressSurvey from '../Modals/NewAddressSurvey'
import NewDeviceSurvey from '../Modals/NewDeviceSurvey'
import NewGatewaySurvey from '../Modals/NewGatewaySurvey'
import NewObjectType from '../Modals/NewObjectType'
import ObjectsTableItem from './components/ObjectsTableItem/ObjectsTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './objects.scss'
import { createObject, fetchObjects } from './scenario-actions'

const FIELDS = [
	{ name: 'Object', center: true },
	{ name: 'Profile Group', center: true },
	{ name: 'NSP', center: true },
	{ name: 'Status', center: true }
]

const OBJECT_TYPES = [
	{
		name: 'device',
		title: 'Create New Device',
		createComponent: NewDeviceSurvey,
		detailComponent: DeviceDetailsModal
	},
	{
		name: 'gateway',
		title: 'Create New Gateway',
		createComponent: NewGatewaySurvey,
		detailComponent: GatewayDetailsModal
	},
	{
		name: 'address',
		title: 'Create New Address',
		createComponent: NewAddressSurvey,
		detailComponent: AddressDetailsModal
	}
]

Modal.setAppElement('#modal-root')

function typeExists(type) {
	return type && ['device', 'gateway', 'address'].includes(type)
}

class Objects extends Component {
	state = {
		createModalOpened: false,
		detailModalOpened: false,
		currentType: '',
		detailsOf: {}
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

	closeCreateModal = () => {
		this.setState({
			createModalOpened: false,
			currentType: ''
		})
	}

	componentDidMount() {
		this.props.fetchObjects()
	}

	createTitleForCreateModal = () => {
		if (typeExists(this.state.currentType)) {
			return OBJECT_TYPES.find(el => el.name === this.state.currentType).title
		} else {
			return 'Select new object type'
		}
	}

	renderDetailModal = () => {
		if (typeExists(this.state.detailsOf.element)) {
			const Details = OBJECT_TYPES.find(
				el => el.name === this.state.detailsOf.element
			).detailComponent
			return <Details data={this.state.detailsOf} />
		} else {
			return null
		}
	}

	renderCreationModal = () => {
		if (typeExists(this.state.currentType)) {
			const Survey = OBJECT_TYPES.find(el => el.name === this.state.currentType)
				.createComponent
			return <Survey onAdd={this.onAdd} />
		} else {
			return <NewObjectType onTypeChoose={this.onTypeChoose} />
		}
	}

	onAdd = entity => {
		this.props.createObject(entity, this.state.currentType)
		this.closeCreateModal()
	}

	onTypeChoose = type => {
		this.setState({
			currentType: type
		})
	}

	renderObjects = matches => {
		const { items } = this.props
		return items.map(item => (
			<ObjectsTableItem
				key={`objects-table-item-${item.id}-${item.name}`}
				responsive={matches}
				data={item}
				onDetails={() => this.openDetailsModal(item)}
			/>
		))
	}

	render() {
		return (
			<div className="content objects">
				<div className={'objects__search-bar'}>
					<SearchBar />
				</div>
				<AddButton onClick={this.openModal}>Add New Object</AddButton>
				<Table.Container root={'objects'}>
					<Table.Content
						root={'objects'}
						headerComponent={<Table.Header items={FIELDS} />}
						renderItems={this.renderObjects}
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
					title={this.createTitleForCreateModal()}
				>
					{this.renderCreationModal()}
				</WedgeModal>
				<WedgeModal
					isOpen={this.state.detailModalOpened}
					onClose={this.closeDetailsModal}
					title={`${this.state.detailsOf.name} - Details`}
				>
					{this.renderDetailModal()}
				</WedgeModal>
			</div>
		)
	}
}

Objects.propTypes = {
	fetchObjects: PropTypes.func.isRequired,
	createObject: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
}

Objects.defaultProps = {
	items: []
}

const loadingSelector = createLoadingSelector(['FETCHING_OBJECTS'])
const errorSelector = createErrorMessageSelector(['FETCHING_OBJECTS'])
const mapStateToProps = state => {
	return {
		items: objectsSelector(state),
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const objectsSelector = state => {
	const ecosystem = state.ecosystems.currentEcosystem
	if (ecosystem) {
		return state.objects[ecosystem] ? state.objects[ecosystem].objects : []
	}

	return []
}

const mapDispatchToProps = dispatch => {
	return {
		fetchObjects: () => dispatch(fetchObjects()),
		createObject: (entity, type) => dispatch(createObject(entity, type))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Objects)
