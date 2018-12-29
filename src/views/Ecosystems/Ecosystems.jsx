import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/Loader/Loader'
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

	handleClick = ecosystem => {
		this.props.openEcosystem(ecosystem)
	}

	render() {
		const { ecosystems, isLoading } = this.props
		if (isLoading) {
			return (
				<div className={'loader-container'}>
					<Loader />
				</div>
			)
		}
		return (
			<div className={'ecosystems'}>
				{ecosystems.map((eco, index) => (
					<EcosystemItem
						ecosystem={eco}
						onClick={() => this.handleClick(eco)}
						key={`ecosystems-list-index-${index}`}
					/>
				))}
			</div>
		)
	}
}

Ecosystems.defaultProps = {
	ecosystems: []
}

Ecosystems.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	ecosystems: PropTypes.array.isRequired,
	fetchEcosystems: PropTypes.func.isRequired,
	openEcosystem: PropTypes.func.isRequired
}

const loadingSelector = createLoadingSelector(['FETCHING_ECOSYSTEMS'])
const errorSelector = createErrorMessageSelector(['FETCHING_ECOSYSTEMS'])
const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		ecosystems: state.ecosystems.items,
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
