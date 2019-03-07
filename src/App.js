import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import history from './history'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import Login from './layouts/Login/Login'
import './reset.scss'
import { startup } from './store/common-scenario-actions'
import { setStripe } from './store/payment/actions'
import { connect } from 'react-redux'
import { func, bool } from 'prop-types'
import GlobalLoader from './components/GlobalLoader/GlobalLoader'
import addFontAwesomeIcons from './utils/addFontIcons'

class App extends React.Component {
	componentDidMount() {
		const { startup, setStripe } = this.props
		addFontAwesomeIcons()
		startup()
		setStripe()
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
	startup: func.isRequired,
	startupFinished: bool.isRequired,
	setStripe: func.isRequired
}

const mapStateToProps = state => {
	return {
		startupFinished: state.global.startupFinished
	}
}

const mapDispatchToProps = (dispatch, { stripe }) => {
	return {
		startup: () => dispatch(startup()),
		setStripe: () => dispatch(setStripe(stripe))
	}
}

export default compose(
	injectStripe,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(App)
