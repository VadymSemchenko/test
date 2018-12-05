import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import indexRoutes from './routes'
import configureStore from './store'

const store = configureStore()

export default function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<Switch>
					{indexRoutes.map((prop, key) => {
						return <Route to={prop.path} component={prop.component} key={key} />
					})}
				</Switch>
			</HashRouter>
		</Provider>
	)
}
