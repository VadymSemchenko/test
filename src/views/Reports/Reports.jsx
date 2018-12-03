import React, { Component } from 'react'
import {
	Button,
	ButtonGroup,
	Col,
	Dropdown,
	Grid,
	MenuItem,
	Row
} from 'react-bootstrap'
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
		<div className={'reports__refresh-container'}>
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
			<ButtonGroup className={'reports__filter-buttons'}>
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
				<Grid fluid>
					<Row>{/*<SearchComponent/>*/}</Row>
					<Row>
						<Col xs={12} sm={3}>
							<p>Realtime View</p>
						</Col>
						<Col sm={9} xs={12}>
							<div className={'right-container'}>
								{this.renderRefreshRateDropdown()}
								{this.renderFilterButtons()}
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

export default Reports
