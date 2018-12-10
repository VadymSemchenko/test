import Dashboard from '../layouts/Dashboard/Dashboard'
import Ecosystems from '../layouts/Ecosystems/Ecosystems'

const indexRoutes = [
	{ path: '/', name: 'Home', component: Ecosystems },
	{ path: '/ecosystems', name: 'Ecosystem', component: Dashboard }
]

export default indexRoutes
