import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import EcosystemItem from './components/EcosystemItem/EcosystemItem'
import './ecosystems.scss'
import { fetchEcosystems, openEcosystem } from './scenario-actions'

class Ecosystems extends Component {
	componentDidMount() {
		this.props.fetchEcosystems()
	}

	render() {
		const { ecosystems } = this.props
		return (
			<div className={'ecosystems'}>
				{ecosystems.map((eco, index) => (
					<EcosystemItem
						ecosystem={eco}
						key={`ecosystems-list-index-${index}`}
					/>
				))}
			</div>
		)
	}
}

Ecosystems.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	ecosystems: PropTypes.array.isRequired,
	fetchEcosystems: PropTypes.func.isRequired,
	openEcosystem: PropTypes.func.isRequired
}

const loadingSelector = createLoadingSelector(['GET_ECOSYSTEMS'])
const errorSelector = createErrorMessageSelector(['GET_ECOSYSTEMS'])
const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		ecosystems: [{}, {}, {}], //state.ecosystems.items,
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchEcosystems: () => dispatch(fetchEcosystems()),
		openEcosystem: ecosystem => dispatch(openEcosystem(ecosystem))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Ecosystems)
