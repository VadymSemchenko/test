import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Provider } from 'react-redux'

import App from './App'
import './assets/css/animate.min.css'
import './assets/css/demo.css'
import './assets/css/pe-icon-7-stroke.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import configureStore from './store'

const store = configureStore

ReactDOM.render(
	<Provider store={store}>
		<StripeProvider apiKey={'pk_test_cYiBGpJkcErUUwN5BBtw6PNl'}>
			<Elements>
				<App />
			</Elements>
		</StripeProvider>
	</Provider>,
	document.getElementById('root')
)

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default
		ReactDOM.render(<NextApp />, document.getElementById('root'))
	})
}
