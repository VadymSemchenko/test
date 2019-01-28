import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import { OBJECT_TABLE_FIELDS, OBJECT_TYPES_CONFIG } from '../../enums'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import NewObjectType from '../Modals/NewObjectType'
import ObjectsTableItem from './components/ObjectsTableItem/ObjectsTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './objects.scss'
import { createObject, fetchObjects, updateObject } from './scenario-actions'

Modal.setAppElement('#modal-root')

function typeExists(type) {
	return type && ['device', 'gateway', 'address'].includes(type)
}

class Objects extends Component {
	state = {
		createModalOpened: false,
		detailModalOpened: false,
		editModalOpened: false,
		currentType: '',
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
			createModalOpened: false,
			currentType: ''
		})
	}

	componentDidMount() {
		this.props.fetchObjects()
	}

	createTitleForCreateModal = () => {
		if (typeExists(this.state.currentType)) {
			return OBJECT_TYPES_CONFIG.find(el => el.name === this.state.currentType)
				.title
		} else {
			return 'Select new object type'
		}
	}

	renderDetailModal = () => {
		if (typeExists(this.state.detailsOf.element)) {
			const Details = OBJECT_TYPES_CONFIG.find(
				el => el.name === this.state.detailsOf.element
			).detailComponent
			return <Details data={this.state.detailsOf} />
		} else {
			return null
		}
	}

	renderEditModal = () => {
		if (typeExists(this.state.detailsOf.element)) {
			const Survey = OBJECT_TYPES_CONFIG.find(
				el => el.name === this.state.detailsOf.element
			).createComponent
			return <Survey onFinish={this.onEdit} item={this.state.detailsOf} edit />
		} else {
			return null
		}
	}

	renderCreationModal = () => {
		if (typeExists(this.state.currentType)) {
			const Survey = OBJECT_TYPES_CONFIG.find(
				el => el.name === this.state.currentType
			).createComponent
			return <Survey onFinish={this.onAdd} />
		} else {
			return <NewObjectType onTypeChoose={this.onTypeChoose} />
		}
	}

	onAdd = entity => {
		this.props.createObject(entity, this.state.currentType)
		this.closeCreateModal()
	}

	onEdit = entity => {
		this.props.updateObject(entity)
		this.closeEditModal()
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
				onEdit={() => this.openEditModal(item)}
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
						headerComponent={<Table.Header items={OBJECT_TABLE_FIELDS} />}
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
			</div>
		)
	}
}

Objects.propTypes = {
	fetchObjects: PropTypes.func.isRequired,
	createObject: PropTypes.func.isRequired,
	updateObject: PropTypes.func.isRequired,
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
		return state.objects[ecosystem.id]
			? state.objects[ecosystem.id].objects
			: []
	}

	return []
}

const mapDispatchToProps = dispatch => {
	return {
		fetchObjects: () => dispatch(fetchObjects()),
		createObject: (entity, type) => dispatch(createObject(entity, type)),
		updateObject: entity => dispatch(updateObject(entity))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Objects)
