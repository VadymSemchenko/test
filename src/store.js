import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './store/sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

let middlewares = [thunk, sagaMiddleware]

if (process.env.NODE_ENV === `development`) {
	const logger = createLogger({
		duration: true,
		diff: true
	})
	middlewares.push(logger)
}

const configureStore = (initialState = {}) => {
	const middleware = applyMiddleware(...middlewares)
	return createStore(reducers, initialState, composeWithDevTools(middleware))
}

export default configureStore()
sagaMiddleware.run(rootSaga)
