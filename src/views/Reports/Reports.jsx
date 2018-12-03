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
		text: 'Never'
	},
	{
		value: 10,
		text: '10 seconds'
	},
	{
		value: 15,
		text: '15 seconds'
	}
]

class Reports extends Component {
	state = {
		rate: { value: 0, text: 'Never' }
	}

	handleChangeRefreshRate = rate => {
		this.setState({ rate })
	}

	renderRefreshRateDropdown = () => (
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
	)

	renderFilterButtons = () => (
		<ButtonGroup>
			<Button bsStyle="primary">All</Button>
			<Button bsStyle="primary">Allowed</Button>
			<Button bsStyle="primary">Alert</Button>
		</ButtonGroup>
	)

	render() {
		return (
			<div className="content report">
				<Grid fluid>
					<Row>{/*<SearchComponent/>*/}</Row>
					<Row
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<Col
							md={8}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<p>Realtime View</p>
						</Col>
						<Col
							md={4}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<p>Refresh: </p>
							{this.renderRefreshRateDropdown()}
							{this.renderFilterButtons()}
						</Col>
					</Row>
					<Row>{/*<ReportsTableHeader/>*/}</Row>
				</Grid>
			</div>
		)
	}
}

export default Reports
