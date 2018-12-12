import React, { Component } from 'react'
import {
	Button,
	ButtonGroup,
	Dropdown,
	Glyphicon,
	MenuItem
} from 'react-bootstrap'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import Loader from '../../components/Loader/Loader'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import ReportsTableHeader from './components/ReportsTableHeader/ReportsTableHeader'
import ReportsTableItem from './components/ReportsTableItem/ReportTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './reports.scss'
import { fetchReports, fetchNewest, fetchOlder } from './scenario-actions'
import PropTypes from 'prop-types'

const rateOptions = [
	{
		value: 0,
		text: 'Freeze'
	},
	{
		value: 5,
		text: '30 seconds'
	},
	{
		value: 60,
		text: 'Every minute'
	}
]

class Reports extends Component {
	constructor(props) {
		super(props)
		this.state = {
			rate: { value: 0, text: 'Freeze' },
			filter: 0,
			interval: null
		}
	}

	componentDidMount() {
		this.props.fetchReports()
		this.startSyncingInterval()
	}

	componentWillUnmount() {
		clearInterval(this.state.interval)
	}

	startSyncingInterval = () => {
		const rateTime = this.state.rate.value
		if (this.state.interval) {
			clearInterval(this.state.interval)
		}
		if (rateTime !== 0) {
			const interval = setInterval(() => {
				this.props.fetchNewest()
			}, rateTime * 1000)
			this.setState({
				interval
			})
		}
	}

	handleChangeRefreshRate = rate => {
		this.setState({ rate }, () => {
			this.startSyncingInterval()
		})
	}

	changeFilter = val => {
		this.setState({
			filter: val
		})
	}

	handleRefresh = () => {
		this.props.fetchReports()
	}

	renderRefreshRateDropdown = () => (
		<div className={'reports__filters-refresh'}>
			<p>Refresh: </p>
			<Dropdown id={'dropdown-refresh-rate'}>
				<Dropdown.Toggle id="dropdown-basic">
					{this.state.rate.text}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{rateOptions.map(rate => (
						<MenuItem
							active={rate.value === this.state.rate.value}
							key={`rate-index-item-${rate.value}`}
							onSelect={() => this.handleChangeRefreshRate(rate)}
						>
							{rate.text}
						</MenuItem>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)

	renderFilterButtons = () => {
		const { filter } = this.state
		return (
			<ButtonGroup className={'reports__filters-buttons'}>
				<Button
					onClick={() => this.changeFilter(0)}
					bsStyle={filter === 0 ? 'primary' : 'default'}
				>
					All
				</Button>
				<Button
					onClick={() => this.changeFilter(1)}
					bsStyle={filter === 1 ? 'primary' : 'default'}
				>
					Allowed
				</Button>
				<Button
					onClick={() => this.changeFilter(2)}
					bsStyle={filter === 2 ? 'primary' : 'default'}
				>
					Alert
				</Button>
			</ButtonGroup>
		)
	}

	renderReports = matches => {
		const { items } = this.props
		return items.map(item => (
			<ReportsTableItem
				key={`reports-table-item-${item.id}-${item.date}`}
				responsive={matches}
				data={item}
			/>
		))
	}

	render() {
		return (
			<div className="content reports">
				<div className={'reports__search-bar'}>
					<SearchBar />
				</div>
				<div className={'reports__filters'}>
					<div className={'left-container'}>
						<p>Realtime View</p>
					</div>
					<div className={'right-container'}>
						{this.renderRefreshRateDropdown()}
						<Glyphicon
							className={'small-icon refresh-button'}
							glyph="repeat"
							onClick={this.handleRefresh}
						/>
						{this.renderFilterButtons()}
					</div>
				</div>
				<div className={'reports__table-container'}>
					<div className={'reports__table'}>
						<MediaQuery minWidth={992}>
							<ReportsTableHeader />
						</MediaQuery>
						<MediaQuery maxWidth={991}>
							{matches => this.renderReports(matches)}
						</MediaQuery>
					</div>
				</div>
				{this.props.items.length !== 0 && !this.props.isLoading && (
					<p onClick={this.props.fetchOlder} className={'reports__more-button'}>
						Load older reports
					</p>
				)}
				{this.props.isLoading && (
					<div className={'loader-container'}>
						<Loader />
					</div>
				)}
			</div>
		)
	}
}

Reports.propTypes = {
	fetchReports: PropTypes.func.isRequired,
	fetchNewest: PropTypes.func.isRequired,
	fetchOlder: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
}

Reports.defaultProps = {
	items: []
}

const loadingSelector = createLoadingSelector(['FETCHING_REPORTS'])
const errorSelector = createErrorMessageSelector(['FETCHING_REPORTS'])
const mapStateToProps = state => {
	return {
		items: state.reports.items,
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchReports: () => dispatch(fetchReports()),
		fetchNewest: () => dispatch(fetchNewest()),
		fetchOlder: () => dispatch(fetchOlder())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Reports)
