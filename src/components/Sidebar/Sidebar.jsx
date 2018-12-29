import logo from 'assets/img/acreto-logo.svg'
import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import dashboardRoutes from 'routes/dashboard.jsx'

import HeaderLinks from '../Header/HeaderLinks.jsx'
import './sidebar.scss'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: window.innerWidth
		}
	}

	activeRoute(routeName) {
		// PROBABLY WON'T GIVE ACTIVE, BECAUSE OF :id
		const filledPathname = routeName.replace(':id', this.props.ecosystem)
		return this.props.location.pathname === filledPathname ? 'active' : ''
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
			<div id="sidebar" className="sidebar wedge" data-color="gray">
				<div className="sidebar-background" />
				<div className="logo">
					<a href="/" className="simple-text logo-normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				<div className="sidebar-wrapper">
					<ul className="nav">
						{this.state.width <= 991 ? <HeaderLinks /> : null}
						<li className={''}>
							<NavLink to={'/'} className="nav-link ecosystem">
								<i className={'pe-7s-angle-left'} />
								<p>All ecosystems</p>
							</NavLink>
						</li>
						{dashboardRoutes.map((prop, key) => {
							if (!prop.redirect) {
								if (prop.nested) {
									return (
										<React.Fragment key={key}>
											<li>
												<a href={'#'} className={'nav-link root'}>
													<i className={prop.icon} />
													<p>{prop.name}</p>
												</a>
											</li>
											{prop.paths.map((path, nestedKey) => {
												return (
													<li
														className={`${this.activeRoute(path.path)} nested`}
														key={nestedKey}
													>
														<NavLink
															to={path.path.replace(
																':id',
																this.props.ecosystem
															)}
															className="nav-link"
															activeClassName="active"
														>
															<i className={path.icon} />
															<p>{path.name}</p>
														</NavLink>
													</li>
												)
											})}
										</React.Fragment>
									)
								}
								return (
									<li className={this.activeRoute(prop.path)} key={key}>
										<NavLink
											to={prop.path.replace(':id', this.props.ecosystem)}
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
	location: PropTypes.object.isRequired,
	ecosystem: PropTypes.string.isRequired
}

const mapStateToProps = state => {
	return {
		ecosystem: state.ecosystems.currentEcosystem
	}
}

export default connect(
	mapStateToProps,
	null
)(Sidebar)
