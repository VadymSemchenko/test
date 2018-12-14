import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import SearchBar from './components/SearchBar/SearchBar'
import './objects.scss'

const FIELDS = [
	{ name: 'Object', center: true },
	{ name: 'Profile Group', center: true },
	{ name: 'NSP', center: true },
	{ name: 'Status', center: true }
]

class Objects extends Component {
	componentDidMount() {}

	renderObjects = () => {
		// const { } = this.props
		return null
		// items.map(item => (
		//   <ReportsTableItem
		//     key={ `reports-table-item-${item.id}-${item.date}` }
		//     responsive={ matches }
		//     data={ item }
		//   />
		// ))
	}

	render() {
		return (
			<div className="content objects">
				<div className={'objects__search-bar'}>
					<SearchBar />
				</div>
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
		items: state.reports.items,
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Objects)
