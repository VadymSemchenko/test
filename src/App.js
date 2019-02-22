import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import history from './history'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import Login from './layouts/Login/Login'
import './reset.scss'
import configureStore from './store'

const store = configureStore

export default function App() {
	return (
		<Provider store={store}>
			<React.Fragment>
				<Router history={history}>
					<Switch>
						<ProtectedRoute path={'/'} exact component={Ecosystems} />
						<ProtectedRoute path={'/ecosystems'} component={Dashboard} />
						<Route path={'/auth'} component={Login} />
					</Switch>
				</Router>
				<ToastContainer />
			</React.Fragment>
		</Provider>
	)
}
