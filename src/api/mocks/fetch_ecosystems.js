import moment from 'moment'

export default [
	{
		id: '123ds-1231qwsdfsd-12eqadfgs',
		name: 'Test Ecosystem #1',
		lastSeen: moment().subtract(5, 'hours'),
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good'
			},
			{
				id: 2,
				name: 'us-east-2',
				status: 'good'
			}
		],
		owner: {
			fullName: 'Test Owner'
		},
		utilization: 41,
		threat: 20,
		down: 55,
		disabled: false
	},
	{
		id: '123ds-1231qwsdfsd-12eqadfgss',
		name: 'Test Ecosystem #2',
		lastSeen: moment().subtract(10, 'days'),
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good'
			},
			{
				id: 2,
				name: 'us-east-2',
				status: 'bad'
			}
		],
		owner: {
			fullName: 'Test Owner #2'
		},
		utilization: 40,
		threat: 20,
		down: 55,
		disabled: true
	}
]
