import AddressDetailsModal from './views/Modals/AddressDetailsModal'
import DeviceDetailsModal from './views/Modals/DeviceDetailsModal'
import GatewayDetailsModal from './views/Modals/GatewayDetailsModal'
import NewAddressSurvey from './views/Modals/NewAddressSurvey'
import NewDeviceSurvey from './views/Modals/NewDeviceSurvey'
import NewGatewaySurvey from './views/Modals/NewGatewaySurvey'

export const OBJECT_TABLE_FIELDS = [
	{ name: 'Object', center: true },
	{ name: 'Profile Group', center: true },
	{ name: 'NSP', center: true },
	{ name: 'Status', center: true }
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

export const OBJECT_CATEGORIES = []

export const OBJECT_TYPES = []

export const OBJECT_ASSET_VALUES = []

export const EXPIRATION_TYPES = [
	{ value: 0, label: 'Hard' },
	{ value: 1, label: 'Soft' }
]
