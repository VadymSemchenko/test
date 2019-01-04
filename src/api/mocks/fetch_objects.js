import moment from 'moment'

export const list = [
	{
		id: '2ewsvw234ewrdsf', // UUID
		name: 'voCore-g2-42434234234', // String
		category: 'IOT', // String or enum ID (need to define enum)
		type: 'Device', // String or enum ID (need to define enum)
		expiry: {
			type: 'Hard', // String or enum ID (need to define) [HARD, SOFT]
			date: moment() // Date time ISO-8601 or another one
		},
		asset_value: 50, // Number
		profile_group: {
			id: 'qrefdw232-13rqf', // UUID
			name: 'Profile Group #1' // String
		},
		description: 'Lorem ipsum', // Long string
		location: {
			type: 'coordinates', // string or enum ID [ coordinates, what else ... ]
			longitude: 12312321,
			latitude: 12313233
		},
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'connected', // string or enum ID
		lastChange: moment().subtract(2, 'days'),
		element: 'device'
	},
	{
		id: '2ewsvw234ewrdsffsdf', // UUID
		name: 'voCore-g2-42434234234address', // String
		category: 'IOT', // String or enum ID (need to define enum)
		type: 'Device', // String or enum ID (need to define enum)
		address_type: 'Internal',
		expiry: {
			type: 'Hard', // String or enum ID (need to define) [HARD, SOFT]
			date: moment() // Date time ISO-8601 or another one
		},
		asset_value: 50, // Number
		profile_group: {
			id: 'qrefdw232-13rqf', // UUID
			name: 'Profile Group #1' // String
		},
		description: 'Lorem ipsum', // Long string
		location: {
			type: 'coordinates', // string or enum ID [ coordinates, what else ... ]
			longitude: 12312321,
			latitude: 12313233
		},
		network: {
			ip: 'IPv6',
			address: {
				address: '192.168.0.1',
				mask: 32
			}
		},
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			},
			{
				id: 2,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			},
			{
				id: 3,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'connected', // string or enum ID
		lastChange: moment().subtract(2, 'days'),
		element: 'address'
	},
	{
		id: '2ewsvw234ewrdse', // UUID
		name: 'voCore-g2-424342342ads', // String
		category: 'IOT', // String or enum ID (need to define enum)
		type: 'Office', // String or enum ID (need to define enum)
		expiry: {
			type: 'Hard', // String or enum ID (need to define) [HARD, SOFT]
			date: moment() // Date time ISO-8601 or another one
		},
		profile_group: {
			id: 'qrefdw232-13rqf', // UUID
			name: 'Profile Group #1' // String
		},
		asset_value: 50, // Number
		gateway_type: 'vGateway', // or IPSEC (string or enum ID)
		description: 'Lorem ipsum', // Long string
		location: {
			type: 'coordinates', // string or enum ID [ coordinates, what else ... ]
			longitude: 12312321,
			latitude: 12313233
		},
		network: {
			ip: 'IPv4',
			mode: 'static', // or DHCP ,string or enum ID
			// if static (not sure about DHCP as designs is missing)
			gateway_ip: {
				mask: 32,
				address: '202.64.64.102'
			},
			default_route: {
				mask: 32,
				address: '202.64.64.102'
			},
			gateway_local: {
				mask: 32,
				address: '202.64.64.102'
			},
			additional_networks: [
				{
					network: {
						mask: 32,
						address: '202.64.64.102'
					},
					next_hop: {
						address: '202.64.64.102'
					}
				}
			]
		},
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'connected', // string or enum ID
		lastChange: moment().subtract(2, 'days'),
		element: 'gateway'
	}
]

export const newOne = {
	id: `2ewsvw234ewrdsf${new Date().getTime()}`, // UUID
	name: 'voCore-g2-42434234234', // String
	category: 'IOT', // String or enum ID (need to define enum)
	type: 'Device', // String or enum ID (need to define enum)
	expiry: {
		type: 'Hard', // String or enum ID (need to define) [HARD, SOFT]
		date: moment() // Date time ISO-8601 or another one
	},
	asset_value: 50, // Number
	profile_group: {
		id: 'qrefdw232-13rqf', // UUID
		name: 'Profile Group #1' // String
	},
	description: 'Lorem ipsum', // Long string
	location: {
		type: 'coordinates', // string or enum ID [ coordinates, what else ... ]
		longitude: 12312321,
		latitude: 12313233
	},
	nsps: [
		{
			id: 1,
			name: 'eu-west-1',
			status: 'good', // good, moderate, bad
			ping: 29, // ms
			loss: 0 // number, percantage
		}
	],
	status: 'connected', // string or enum ID
	lastChange: moment().subtract(2, 'days')
}
