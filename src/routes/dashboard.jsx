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

const LoadableContentList = Loadable({
	loader: () => import('../views/ContentList/ContentList'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableUsers = Loadable({
	loader: () => import('../views/Users/Users'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableGovernance = Loadable({
	loader: () => import('../views/Governance/Governance'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableSecurity = Loadable({
	loader: () => import('../views/Security/Security'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableAddressTranslation = Loadable({
	loader: () => import('../views/AddressTranslation/AddressTranslation'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const dashboardRoutes = [
	{
		nested: true,
		name: 'Elements',
		icon: 'pe-7s-network',
		paths: [
			{
				path: '/ecosystems/:id/objects',
				name: 'Objects',
				icon: 'pe-7s-albums',
				component: LoadableObjects
			},
			{
				path: '/ecosystems/:id/contentlist',
				name: 'Content List',
				icon: 'pe-7s-menu',
				component: LoadableContentList
			},
			{
				path: '/ecosystems/:id/users',
				name: 'Users',
				icon: 'pe-7s-user',
				component: LoadableUsers
			}
		]
	},
	{
		nested: true,
		name: 'Policies',
		icon: 'pe-7s-check',
		paths: [
			{
				path: '/ecosystems/:id/security',
				name: 'Security',
				icon: 'pe-7s-unlock',
				component: LoadableSecurity
			},
			{
				path: '/ecosystems/:id/addresstranslations',
				name: 'Address Translation',
				icon: 'pe-7s-way',
				component: LoadableAddressTranslation
			}
		]
	},
	{
		path: '/ecosystems/:id/reports',
		name: 'Reports',
		icon: 'pe-7s-note2',
		component: LoadableReports
	},
	{
		path: '/ecosystems/:id/governance',
		name: 'Governance',
		icon: 'pe-7s-users',
		component: LoadableGovernance
	},
	{ redirect: true, path: '/', to: '/ecosystems/:id/reports', name: 'Reports' }
]

export default dashboardRoutes
