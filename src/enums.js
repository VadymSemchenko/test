import TerminatedIcon from './assets/img/PNG/Acreto_Icon 19.png'
import ActiveIcon from './assets/img/PNG/Acreto_Icon 20.png'
import CompletedIcon from './assets/img/PNG/Acreto_Icon 27.png'
import TimetoutIcon from './assets/img/PNG/Acreto_Icon 28.png'
import AddressDetailsModal from './views/Modals/AddressDetailsModal'
import DeviceDetailsModal from './views/Modals/DeviceDetailsModal'
import GatewayDetailsModal from './views/Modals/GatewayDetailsModal'
import NewAddressSurvey from './views/Modals/NewAddressSurvey'
import NewDeviceSurvey from './views/Modals/NewDeviceSurvey'
import NewGatewaySurvey from './views/Modals/NewGatewaySurvey'

export const REPORT_TABLE_FIELDS = [
	{ name: 'Policy', center: true },
	{ name: 'Source', center: true },
	{ name: 'Service', center: true },
	{ name: 'Application', center: true },
	{ name: 'Destination', center: true },
	{ name: 'Action', center: true },
	{ name: 'Alert', center: true },
	{ name: 'Status', center: true }
]

export const REPORT_STATUSES = [
	{ slug: 'active', name: 'Active', icon: ActiveIcon },
	{ slug: 'completed', icon: CompletedIcon, name: 'Completed' },
	{ slug: 'terminated', icon: TerminatedIcon, name: 'Terminated' },
	{ slug: 'timeout', icon: TimetoutIcon, name: 'Timed out' }
]

export const OBJECT_TABLE_FIELDS = [
	{ name: 'Object', center: true },
	{ name: 'Profile Group', center: true },
	{ name: 'NSP', center: true },
	{ name: 'Status', center: true }
]

export const PROFILE_GROUPS = [
	{
		label: 'Finances',
		value: 0
	},
	{
		label: 'IT Guys',
		value: 1
	},
	{
		label: 'Sales',
		value: 2
	}
]

export const OBJECT_TYPES_CONFIG = [
	{
		name: 'device',
		title: 'Create New Device',
		createComponent: NewDeviceSurvey,
		detailComponent: DeviceDetailsModal
	},
	{
		name: 'gateway',
		title: 'Create New Gateway',
		createComponent: NewGatewaySurvey,
		detailComponent: GatewayDetailsModal
	},
	{
		name: 'address',
		title: 'Create New Address',
		createComponent: NewAddressSurvey,
		detailComponent: AddressDetailsModal
	}
]

export const OBJECT_CATEGORIES = [
	{ label: 'IoT', value: 0 },
	{ label: 'Cloud Instance', value: 1 },
	{ label: 'SaaS Application', value: 2 },
	{ label: 'Office', value: 3 },
	{ label: 'Data Center', value: 4 },
	{ label: 'Mobile', value: 5 },
	{ label: 'Remote User', value: 6 }
]

export const OBJECT_TYPES = [
	{ label: 'Device', value: 0 },
	{ label: 'Habitat', value: 1 },
	{ label: 'IP', value: 2 }
]

export const OBJECT_ASSET_VALUES = Array.from(Array(101).keys()).map(n => ({
	label: String(n),
	value: n
}))

export const EXPIRATION_TYPES = [
	{ value: 0, label: 'Hard' },
	{ value: 1, label: 'Soft' }
]

export const LOCATION_TYPE = {
	AUTO: 0,
	REGION: 1,
	COORDINATES: 2
}

export const LOCATION_TYPE_OPTIONS = [
	{ label: 'Auto', value: LOCATION_TYPE.AUTO },
	{ label: 'Region', value: LOCATION_TYPE.REGION },
	{ label: 'Coordinates', value: LOCATION_TYPE.COORDINATES }
]

export const AVAILABLE_REGIONS = [
	{ label: 'US East', value: 0 },
	{ label: 'US West', value: 1 },
	{ label: 'US Central', value: 2 },
	{ label: 'SA East', value: 3 }
]

export const GATEWAY_TYPES = [
	{ value: 0, label: 'vGateway' },
	{ value: 1, label: 'IPSEC' }
]

export const IP_TYPES = [
	{ value: 0, label: 'IPv4' },
	{ value: 1, label: 'IPv6' }
]

export const IP_MODES = {
	DHCP: 0,
	Static: 1
}
export const IP_MODES_OPTIONS = [
	{ value: IP_MODES.DHCP, label: 'DHCP' },
	{ value: IP_MODES.Static, label: 'Static' }
]

export const MASKS = [
	{ value: 30, label: '30' },
	{ value: 29, label: '29' },
	{ value: 28, label: '28' },
	{ value: 27, label: '27' },
	{ value: 26, label: '26' },
	{ value: 25, label: '25' },
	{ value: 24, label: '24' }
]

export const ADDRESS_TYPES = {
	INTERNAL: 0,
	EXTERNAL: 1
}

export const ADDRESS_TYPES_OPTIONS = [
	{ value: ADDRESS_TYPES.INTERNAL, label: 'Internal' },
	{ value: ADDRESS_TYPES.EXTERNAL, label: 'External' }
]
