import React, { Component } from 'react'
import cx from 'classnames'
import { number, func, array } from 'prop-types'

import './tabs-header.scss'

class TabsHeader extends Component {
	render() {
		const { tabs, selectedIndex, onSelect } = this.props
		return (
			<div className="tabs-header-container">
				{tabs.map(({ name }, index) => {
					const classes = cx('single-tab-container', {
						'--active': selectedIndex === index
					})
					return (
						<div key={name} onClick={() => onSelect(index)} className={classes}>
							{name}
						</div>
					)
				})}
			</div>
		)
	}
}

TabsHeader.propTypes = {
	selectedIndex: number.isRequired,
	onSelect: func.isRequired,
	tabs: array.isRequired
}

export default TabsHeader
