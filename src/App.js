import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import indexRoutes from './routes'
import configureStore from './store'

const store = configureStore()

export default function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<Switch>
					{/*{indexRoutes.map((prop, key) => {*/}
					{/*return <Route path={prop.path} component={prop.component} key={key} />*/}
					{/*})}*/}
					<Route path={'/'} exact component={Ecosystems} />
					<Route path={'/ecosystems'} component={Dashboard} />
				</Switch>
			</HashRouter>
		</Provider>
	)
}
