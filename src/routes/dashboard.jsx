import React from 'react'
import Loadable from 'react-loadable'
import Loader from '../components/Loader/Loader'

const LoadableReports = Loadable({
	loader: () => import('../views/Reports/Reports'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableObjects = Loadable({
	loader: () => import('../views/Objects/Objects'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const dashboardRoutes = [
	{
		path: '/ecosystems/:id/reports',
		name: 'Reports',
		icon: 'pe-7s-note2',
		component: LoadableReports
	},
	{
		path: '/ecosystems/:id/objects',
		name: 'Objects',
		icon: 'pe-7s-albums',
		component: LoadableObjects
	},
	{ redirect: true, path: '/', to: '/ecosystems/:id/reports', name: 'Reports' }
]

export default dashboardRoutes
