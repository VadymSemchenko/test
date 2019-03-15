import { combineReducers } from 'redux'
import { authReducer } from './store/auth/reducer'
import { ecosystemsReducer } from './store/ecosystems/reducer'
import errorReducer from './store/errors/reducer'
import loadingReducer from './store/loading/reducer'
import { objectsReducer } from './store/objects/reducer'
import { policyReducer } from './store/policies/reducer'
import { reportsReducer } from './store/reports'
import { globalReducer } from './store/global/reducer'
import { userReducer } from './store/user/reducer'
import paymentReducer from './store/payment/reducer'
import { USER, PAYMENT } from './constants/reducersNames'

export default combineReducers({
	auth: authReducer,
	reports: reportsReducer,
	ecosystems: ecosystemsReducer,
	objects: objectsReducer,
	policies: policyReducer,
	loading: loadingReducer,
	errors: errorReducer,
	global: globalReducer,
	[USER]: userReducer,
	[PAYMENT]: paymentReducer
})
