import {
	FETCHING_REPORTS_FAILURE,
	FETCHING_REPORTS_REQUESTED,
	FETCHING_REPORTS_SUCCESS
} from './action-types'

export function fetchingReportsStarted() {
	return {
		type: FETCHING_REPORTS_REQUESTED
	}
}

export function fetchingReportsSuccess(results, append = false) {
	return {
		type: FETCHING_REPORTS_SUCCESS,
		payload: {
			results,
			append
		}
	}
}

export function fetchingReportsFailed(err) {
	return {
		type: FETCHING_REPORTS_FAILURE,
		payload: {
			message: err
		}
	}
}
