import Dashboard from '../layouts/Dashboard/Dashboard'
import Ecosystems from '../layouts/Ecosystems/Ecosystems'

const indexRoutes = [
	{ path: '/ecosystems', name: 'Ecosystem', component: Dashboard },
	{ path: '/', name: 'Home', component: Ecosystems }
]

export default indexRoutes
