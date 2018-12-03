import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import indexRoutes from './routes'

export default function App() {
	return (
		<HashRouter>
			<Switch>
				{indexRoutes.map((prop, key) => {
					return <Route to={prop.path} component={prop.component} key={key} />
				})}
			</Switch>
		</HashRouter>
	)
}
