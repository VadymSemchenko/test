import React from 'react'
import { Dropdown, MenuItem } from 'react-bootstrap'
import './search-bar.scss'

export default class SearchBar extends React.Component {
	state = {
		value: ''
	}

	handleChange = e => {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
			<div className={'search-bar'}>
				<Dropdown id={'dropdown-refresh-rate'}>
					<Dropdown.Toggle bsStyle={'primary'} id="dropdown-basic">
						{'All'}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{['All', 'Some', 'Any'].map(rate => (
							<MenuItem active={rate === 'All'} key={`rate-index-item-${rate}`}>
								{rate}
							</MenuItem>
						))}
					</Dropdown.Menu>
				</Dropdown>
				<img className={'small-icon'} />
				<input
					placeholder={'Search'}
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}
