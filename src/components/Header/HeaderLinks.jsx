import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dropdown, MenuItem, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
	NAVBAR_NOTIFICATION_FAKE,
	NAVBAR_SEARCH,
	NAVBAR_USER
} from '../../assets/Icons'
import { logout } from '../../store/common-scenario-actions'
import { pathSlugToPageName } from '../../utils/utils'

class HeaderLinks extends Component {
	render() {
		const splittedPath = this.props.location.pathname.split('/')
		const path = splittedPath[splittedPath.length - 1]
		return (
			<div>
				<Nav pullLeft>
					<h2 className={'page-title'}>{pathSlugToPageName(path)}</h2>
				</Nav>
				<Nav pullRight>
					{this.props.showSearch && (
						<NavItem
							eventKey={0}
							href="#"
							className={'navbar-item component-coming-soon'}
						>
							<div>
								<img
									src={NAVBAR_SEARCH}
									alt={'navbar-search'}
									className={'navbar-search'}
								/>
							</div>
						</NavItem>
					)}
					<NavItem
						eventKey={1}
						href="#"
						className={'navbar-item component-coming-soon'}
					>
						<div>
							<img
								src={NAVBAR_NOTIFICATION_FAKE}
								alt={'navbar-notification'}
								className={'navbar-notification'}
							/>
						</div>
					</NavItem>
					<div className={'navbar-item last'}>
						<div className={'flex-row nav-profile'}>
							<Dropdown id={'dropdown-profile-options'}>
								<Dropdown.Toggle id="dropdown-basic">
									<img
										src={NAVBAR_USER}
										alt={'navbar-user'}
										className={'navbar-user'}
									/>
									<p>{this.props.username}</p>
									<i className={'pe-7s-angle-down'} />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<MenuItem
										className={'wedge-menu-item'}
										disabled={true}
										onSelect={() => {}}
									>
										Profile
									</MenuItem>
									<MenuItem
										className={'wedge-menu-item'}
										onSelect={this.props.logout}
									>
										Logout
									</MenuItem>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
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
	history: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
})

const ConnectedHeaderLinks = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderLinks)
export default withRouter(ConnectedHeaderLinks)
