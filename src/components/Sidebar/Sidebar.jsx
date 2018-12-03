import logo from 'assets/img/acreto-logo.svg'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import dashboardRoutes from 'routes/dashboard.jsx'

import HeaderLinks from '../Header/HeaderLinks.jsx'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: window.innerWidth
		}
	}

	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
	}

	updateDimensions() {
		this.setState({ width: window.innerWidth })
	}

	componentDidMount() {
		this.updateDimensions()
		window.addEventListener('resize', this.updateDimensions.bind(this))
	}

	render() {
		return (
			<div id="sidebar" className="sidebar" data-color="gray">
				<div className="sidebar-background" />
				<div className="logo">
					<a href="https://acreto.io/" className="simple-text logo-normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				<div className="sidebar-wrapper">
					<ul className="nav">
						{this.state.width <= 991 ? <HeaderLinks /> : null}
						{dashboardRoutes.map((prop, key) => {
							if (!prop.redirect) {
								return (
									<li
										className={
											prop.upgrade
												? 'active active-pro'
												: this.activeRoute(prop.path)
										}
										key={key}
									>
										<NavLink
											to={prop.path}
											className="nav-link"
											activeClassName="active"
										>
											<i className={prop.icon} />
											<p>{prop.name}</p>
										</NavLink>
									</li>
								)
							}
							return null
						})}
					</ul>
				</div>
			</div>
		)
	}
}

Sidebar.propTypes = {
	location: PropTypes.object.isRequired
}

export default Sidebar
