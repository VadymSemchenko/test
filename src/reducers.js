import { combineReducers } from 'redux'
import { ecosystemsReducer } from './store/ecosystems/reducer'
import errorReducer from './store/errors/reducer'
import loadingReducer from './store/loading/reducer'
import { objectsReducer } from './store/objects/reducer'
import { reportsReducer } from './store/reports'

export default combineReducers({
	reports: reportsReducer,
	ecosystems: ecosystemsReducer,
	objects: objectsReducer,
	loading: loadingReducer,
	errors: errorReducer
})
