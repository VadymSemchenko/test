import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
	ACRETO_LOGO,
	BACK_ARROW,
	MENU_ADDRESS,
	MENU_CONTENT,
	MENU_DOWN_ARROW,
	MENU_ELEMENTS,
	MENU_GOVERNANCE,
	MENU_PLUS_RECT,
	MENU_POLICIES,
	MENU_REPORT,
	MENU_SECURITY,
	MENU_USERS
} from '../../assets/Icons'

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
		const filledPathname = routeName.replace(':id', this.props.ecosystem.id)
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
				<div className="logo">
					<a href="/" className="simple-text logo-normal full-width">
						<div className="logo-img">
							<img src={ACRETO_LOGO} alt="logo_image" />
						</div>
					</a>
					<div className={'divider'} />
				</div>
				<div className="sidebar-wrapper">
					<ul className="nav">
						{this.state.width <= 991 ? <HeaderLinks /> : null}
						<li className={''}>
							<NavLink to={'/'} className="nav-link ecosystem">
								<img src={BACK_ARROW} className={'back-arrow'} />
								<p className={'ecosystem--text'}>All Ecosystems</p>
							</NavLink>
							<div className={'ecosystem-divider'} />
						</li>
						<div className={'ecosystem--name'}>{this.props.ecosystem.name}</div>
						<li>
							<NavLink
								to={'/ecosystems/:id/objects'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className={'nav-link root with-arrow'}
							>
								<div className={'left-container'}>
									<img
										className={'small-image'}
										alt={'Elements'}
										src={MENU_ELEMENTS}
									/>
									<p>Elements</p>
									<img
										className={'small-image add'}
										alt={'add'}
										src={MENU_PLUS_RECT}
									/>
								</div>
								<img
									className={'small-image down'}
									alt={'down-arrow'}
									src={MENU_DOWN_ARROW}
								/>
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/objects'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/objects'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Objects'}
									src={MENU_ELEMENTS}
								/>
								<p>Objects</p>
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/contentlist'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/contentlist'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Content List'}
									src={MENU_CONTENT}
								/>
								<p>Content List</p>
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute('/ecosystems/:id/users')} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/users'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img className={'small-image'} alt={'Users'} src={MENU_USERS} />
								<p>Users</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/ecosystems/:id/security'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className={'nav-link root'}
							>
								<img
									className={'small-image'}
									alt={'Policies'}
									src={MENU_POLICIES}
								/>
								<p>Policies</p>
								<img
									className={'small-image add'}
									alt={'add'}
									src={MENU_PLUS_RECT}
								/>
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/security'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/security'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Security'}
									src={MENU_SECURITY}
								/>
								<p>Security</p>
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/addresstranslations'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/addresstranslations'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Address Translations'}
									src={MENU_ADDRESS}
								/>
								<p>Address Translations</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/ecosystems/:id/reports'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className={'nav-link root'}
							>
								<img
									className={'small-image'}
									alt={'Reports'}
									src={MENU_REPORT}
								/>
								<p>Reports</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/ecosystems/:id/governance'.replace(
									':id',
									this.props.ecosystem.id
								)}
								className={'nav-link root'}
							>
								<img
									className={'small-image'}
									alt={'Governance'}
									src={MENU_GOVERNANCE}
								/>
								<p>Governance</p>
							</NavLink>
						</li>
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
