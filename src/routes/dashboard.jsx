import React from 'react'
import Loadable from 'react-loadable'

const LoadableReports = Loadable({
	loader: () => import('../views/Reports/Reports'),
	loading: () => <div>Loading...</div>
})

const dashboardRoutes = [
	{
		path: '/ecosystems/reports',
		name: 'Reports',
		icon: 'pe-7s-note2',
		component: LoadableReports
	},
	{ redirect: true, path: '/', to: '/ecosystems/reports', name: 'Reports' }
]

export default dashboardRoutes
