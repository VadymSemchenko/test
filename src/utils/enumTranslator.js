import {
	ADDRESS_TYPES_OPTIONS,
	AVAILABLE_REGIONS,
	EXPIRATION_TYPE_OPTIONS,
	GATEWAY_TYPE_OPTIONS,
	IP_TYPE_OPTIONS,
	LOCATION_TYPE_OPTIONS,
	MASKS,
	OBJECT_CATEGORIES,
	OBJECT_TYPES,
	PROFILE_GROUPS
} from '../enums'

export default {
	category: id => find(OBJECT_CATEGORIES, id),
	type: id => find(OBJECT_TYPES, id),
	expirationType: id => find(EXPIRATION_TYPE_OPTIONS, id),
	profileGroup: id => find(PROFILE_GROUPS, id),
	location: id => find(LOCATION_TYPE_OPTIONS, id),
	region: id => find(AVAILABLE_REGIONS, id),
	protocolType: id => find(IP_TYPE_OPTIONS, id),
	addressType: id => find(ADDRESS_TYPES_OPTIONS, id),
	mask: id => find(MASKS, id),
	gatewayType: id => find(GATEWAY_TYPE_OPTIONS, id)
}

function find(enums, id) {
	return enums.find(c => c.value === id) || { label: 'unkn' }
}
