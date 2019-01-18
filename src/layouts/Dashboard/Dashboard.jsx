import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'
import { Redirect, Route, Switch } from 'react-router-dom'

import dashboardRoutes from 'routes/dashboard.jsx'

import { style } from 'variables/Variables.jsx'

class Dashboard extends Component {
	componentDidUpdate(e) {
		if (
			window.innerWidth < 993 &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf('nav-open') !== -1
		) {
			document.documentElement.classList.toggle('nav-open')
		}
		if (e.history.action === 'PUSH') {
			document.documentElement.scrollTop = 0
			document.scrollingElement.scrollTop = 0
		}
	}

	render() {
		return (
			<div className="wrapper">
				<NotificationSystem style={style} />
				<Sidebar {...this.props} />
				<div id="main-panel" className="main-panel">
					<div className={'dashboard-navbar'}>
						<Header {...this.props} />
					</div>
					<Switch>
						{dashboardRoutes.map((prop, key) => {
							if (prop.name === 'Notifications') {
								const RouteComponent = prop.component
								return (
									<Route
										path={prop.path}
										key={key}
										render={routeProps => <RouteComponent {...routeProps} />}
									/>
								)
							}
							if (prop.redirect) {
								return <Redirect from={prop.path} to={prop.to} key={key} />
							}
							if (prop.nested) {
								return prop.paths.map((r, nkey) => (
									<Route path={r.path} component={r.component} key={nkey} />
								))
							}
							return (
								<Route path={prop.path} component={prop.component} key={key} />
							)
						})}
					</Switch>
					<Footer />
				</div>
			</div>
		)
	}
}

export default Dashboard
