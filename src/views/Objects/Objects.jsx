import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import ObjectsTableItem from './components/ObjectsTableItem/ObjectsTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './objects.scss'
import { fetchObjects } from './scenario-actions'

const FIELDS = [
	{ name: 'Object', center: true },
	{ name: 'Profile Group', center: true },
	{ name: 'NSP', center: true },
	{ name: 'Status', center: true }
]

class Objects extends Component {
	componentDidMount() {
		this.props.fetchObjects()
	}

	renderObjects = matches => {
		const { items } = this.props
		return items.map(item => (
			<ObjectsTableItem
				key={`objects-table-item-${item.id}-${item.name}`}
				responsive={matches}
				data={item}
			/>
		))
	}

	render() {
		return (
			<div className="content objects">
				<div className={'objects__search-bar'}>
					<SearchBar />
				</div>
				<AddButton onClick={() => {}}>Add New Object</AddButton>
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
			</div>
		)
	}
}

Objects.propTypes = {
	fetchObjects: PropTypes.func.isRequired,
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
		fetchObjects: () => dispatch(fetchObjects())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Objects)
