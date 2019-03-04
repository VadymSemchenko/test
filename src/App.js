import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import history from './history'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import Login from './layouts/Login/Login'
import './reset.scss'
import { startup } from './store/common-scenario-actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GlobalLoader from './components/GlobalLoader/GlobalLoader'
import addFontAwesomeIcons from './utils/addFontIcons'

addFontAwesomeIcons()

class App extends React.Component {
	componentDidMount() {
		this.props.startup()
	}

	render() {
		const { startupFinished } = this.props
		return (
			<React.Fragment>
				{startupFinished ? (
					<Router history={history}>
						<Switch>
							<ProtectedRoute path={'/'} exact component={Ecosystems} />
							<ProtectedRoute path={'/ecosystems'} component={Dashboard} />
							<Route path={'/auth'} component={Login} />
						</Switch>
					</Router>
				) : (
					<GlobalLoader />
				)}
				<ToastContainer />
			</React.Fragment>
		)
	}
}

App.propTypes = {
	startup: PropTypes.func.isRequired,
	startupFinished: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
	return {
		startupFinished: state.global.startupFinished
	}
}

const mapDispatchToProps = dispatch => {
	return {
		startup: () => dispatch(startup())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
