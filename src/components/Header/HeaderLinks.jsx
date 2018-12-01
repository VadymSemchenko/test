import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'

class HeaderLinks extends Component {
	render() {
		const notification = (
			<div>
				<i className="fa fa-bell-o" />
				<b className="caret" />
				<span className="notification">0</span>
				<p className="hidden-lg hidden-md">Notification</p>
			</div>
		)
		return (
			<div>
				<Nav pullRight>
					<NavItem eventKey={1} href="#">
						{notification}
					</NavItem>
					<NavItem eventKey={2} href="#">
						Log out
					</NavItem>
				</Nav>
			</div>
		)
	}
}

export default HeaderLinks
