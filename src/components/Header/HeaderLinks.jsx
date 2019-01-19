import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
	NAVBAR_NOTIFICATION_FAKE,
	NAVBAR_SEARCH,
	NAVBAR_USER
} from '../../assets/Icons'

class HeaderLinks extends Component {
	render() {
		return (
			<div>
				<Nav pullRight>
					{this.props.showSearch && (
						<NavItem eventKey={0} href="#" className={'navbar-item'}>
							<div>
								<img
									src={NAVBAR_SEARCH}
									alt={'navbar-search'}
									className={'navbar-search'}
								/>
							</div>
						</NavItem>
					)}
					<NavItem eventKey={1} href="#" className={'navbar-item'}>
						<div>
							<img
								src={NAVBAR_NOTIFICATION_FAKE}
								alt={'navbar-notification'}
								className={'navbar-notification'}
							/>
						</div>
					</NavItem>
					<NavItem
						eventKey={2}
						href="#"
						className={'navbar-item last'}
						onClick={() => this.props.history.push('/login')}
					>
						<div className={'flex-row nav-profile'}>
							<img
								src={NAVBAR_USER}
								alt={'navbar-user'}
								className={'navbar-user'}
							/>
							<p>John Smith</p>
							<i className={'pe-7s-angle-down'} />
						</div>
					</NavItem>
				</Nav>
			</div>
		)
	}
}

HeaderLinks.defaultProps = {
	showSearch: false
}

HeaderLinks.propTypes = {
	showSearch: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(HeaderLinks)
