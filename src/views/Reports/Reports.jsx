import React, { Component } from 'react'
import { Button, ButtonGroup, Dropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import ReportsTableHeader from './components/ReportsTableHeader/ReportsTableHeader'
import ReportsTableItem from './components/ReportsTableItem/ReportTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './reports.scss'

const rateOptions = [
	{
		value: 0,
		text: 'Freeze'
	},
	{
		value: 30,
		text: '30 seconds'
	},
	{
		value: 60,
		text: 'Every minute'
	}
]

class Reports extends Component {
	state = {
		rate: { value: 0, text: 'Never' },
		filter: 0
	}

	handleChangeRefreshRate = rate => {
		this.setState({ rate })
	}

	changeFilter = val => {
		this.setState({
			filter: val
		})
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
						{this.renderFilterButtons()}
					</div>
				</div>
				<div className={'reports__table-container'}>
					<div className={'reports__table'}>
						<ReportsTableHeader />
						<ReportsTableItem
							data={{
								id: '123',
								date: '2008-09-15T15:53:00',
								policy: '',
								source: 'jardance.Xeoma-Cloud.com',
								service: {
									protocol: 'http',
									port: 80,
									tcp: true,
									status: 'active'
								},
								application: 'browsing',
								destination: 'jardance.Xeoma-Cloud.com',
								actions: ['Allow', 'URL'],
								alert: 'Threat',
								status: 'active'
							}}
						/>
						<ReportsTableItem
							data={{
								id: '123',
								date: '2017-09-15T15:53:00',
								policy: '',
								source: 'jardance.Xeoma-Cloud.com',
								service: {
									protocol: 'http',
									port: 443,
									tcp: true,
									status: 'active'
								},
								application: 'browsing',
								destination: 'jardance.Xeoma-Cloud.com',
								actions: ['Allow', 'URL'],
								alert: false,
								status: 'completed'
							}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const loadingSelector = createLoadingSelector(['GET_REPORTS'])
const errorSelector = createErrorMessageSelector(['GET_REPORTS'])
const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		items: state.reports.items,
		error: errorSelector(state)
	}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Reports)
