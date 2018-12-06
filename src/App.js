import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import configureStore from './store'

const store = configureStore()

export default function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<Switch>
					<Route path={'/'} exact component={Ecosystems} />
					<Route path={'/ecosystems'} component={Dashboard} />
				</Switch>
			</HashRouter>
		</Provider>
	)
}
