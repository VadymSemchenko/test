import {
	ARROW_BOTTOM_RED,
	ARROW_TOP_GREEN,
	CONNECT_STATUS,
	UNDEFINED_STATUS,
	US_EAST_GREEN,
	US_EAST_RED
} from '../assets/Icons'
import ApFareast from '../assets/img/PNG/Ecosystem_ap-fareast-1-map.png'
import ApMideast from '../assets/img/PNG/Ecosystem_ap-mideast-1-map-18.png'
import AuCentral from '../assets/img/PNG/Ecosystem_au-central-1-map.png'
import EuEast from '../assets/img/PNG/Ecosystem_eu-east-1-map-17.png'
import EuWest from '../assets/img/PNG/Ecosystem_eu-west-1-map-07.png'
import UsCentral from '../assets/img/PNG/Ecosystem_us-central-1-map.png'
import UsWest from '../assets/img/PNG/Ecosystem_us-west-1-map.png'

export function getIconForRegionName(regionName, showGreen = true) {
	switch (regionName) {
		case 'ap-fareast-1':
			return ApFareast

		case 'ap-mideast-1':
			return ApMideast

		case 'au-central-1':
			return AuCentral
		case 'eu-east-1':
			return EuEast
		case 'eu-west-1':
			return EuWest
		case 'us-central-1':
			return UsCentral
		case 'us-east-1':
			return showGreen ? US_EAST_GREEN : US_EAST_RED
		case 'us-west-1':
			return UsWest
		case 'EWR1':
			return showGreen ? US_EAST_GREEN : US_EAST_RED
		default:
			return showGreen ? US_EAST_GREEN : US_EAST_RED
	}
}

export function getIconForStatus(status) {
	switch (status) {
		case 'connected':
			return CONNECT_STATUS
		default:
			return UNDEFINED_STATUS
	}
}

export function getArrow(isUp) {
	return isUp ? ARROW_TOP_GREEN : ARROW_BOTTOM_RED
}
