import logo from 'assets/img/acreto-logo.svg'
import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

import { style } from 'variables/Variables.jsx'
import HeaderLinks from '../../components/Header/HeaderLinks'

class Ecosystems extends Component {
	// componentDidUpdate (e) {
	//   if (
	//     window.innerWidth < 993 &&
	//     e.history.location.pathname !== e.location.pathname &&
	//     document.documentElement.className.indexOf('nav-open') !== -1
	//   ) {
	//     document.documentElement.classList.toggle('nav-open')
	//   }
	//   if (e.history.action === 'PUSH') {
	//     document.documentElement.scrollTop = 0
	//     document.scrollingElement.scrollTop = 0
	//     this.refs.mainPanel.scrollTop = 0
	//   }
	// }

	render() {
		return (
			<div className="wrapper">
				<div>
					<div className="logo">
						<a href="https://acreto.io/" className="simple-text logo-normal">
							<div className="logo-img">
								<img src={logo} alt="logo_image" />
							</div>
						</a>
					</div>
					<div className={'main-panel'}>
						<Navbar fluid>
							<Navbar.Header>
								<Navbar.Brand>{123}</Navbar.Brand>
								<Navbar.Toggle onClick={this.mobileSidebarToggle} />
							</Navbar.Header>
							<Navbar.Collapse>
								<HeaderLinks />
							</Navbar.Collapse>
						</Navbar>
					</div>
				</div>
			</div>
		)
	}
}

export default Ecosystems
