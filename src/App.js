import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import history from './history'
import Login from './layouts/Login/Login'
import configureStore from './store'
import './reset.scss'

const store = configureStore()

export default function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route path={'/'} exact component={Ecosystems} />
					<Route path={'/ecosystems'} component={Dashboard} />
					<Route path={'/login'} component={Login} />
				</Switch>
			</Router>
		</Provider>
	)
}
