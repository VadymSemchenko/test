import { combineReducers } from 'redux'
import errorReducer from './store/errors/reducer'
import loadingReducer from './store/loading/reducer'
import { reportsReducer } from './store/reports'

export default combineReducers({
	reports: reportsReducer,
	loading: loadingReducer,
	errors: errorReducer
})
