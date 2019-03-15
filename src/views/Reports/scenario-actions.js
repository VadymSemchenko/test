import * as ES from '../../api/elasticsearch'
import * as api from '../../api/rest'
import {
	fetchingReportsFailed,
	fetchingReportsStarted,
	fetchingReportsSuccess
} from '../../store/reports/actions'

const REPORTS_PER_PAGE = process.env.REACT_APP_REPORTS_PER_PAGE || 50

export function fetchReports() {
	return async (dispatch, getState) => {
		try {
			dispatch(fetchingReportsStarted())
			const reports = await api.fetchReports({
				ecosystem: getState().ecosystems.currentecosystem.uuid,
				customer: getState().auth.selectedCustomer.id,
				query: {
					query: {
						bool: {
							must: {
								match_all: {}
							}
						}
					},
					sort: {
						EventDatetime: { order: 'asc' }
					},
					size: REPORTS_PER_PAGE
				}
			})
			dispatch(fetchingReportsSuccess(reports))
		} catch (err) {
			dispatch(fetchingReportsFailed(err))
		}
	}
}

export function fetchNewest() {
	return async (dispatch, getState) => {
		const element = getState().reports.items[0]
		try {
			dispatch(fetchingReportsStarted())
			const results = await ES.fetchReports({
				query: {
					bool: {
						must: { match_all: {} },
						filter: {
							range: {
								EventDatetime: {
									gt: element.date
								}
							}
						}
					}
				},
				sort: {
					EventDatetime: { order: 'desc' }
				},
				size: REPORTS_PER_PAGE
			})
			dispatch(fetchingReportsSuccess(results, true))
		} catch (err) {
			dispatch(fetchingReportsFailed())
		}
	}
}

export function fetchOlder() {
	return async (dispatch, getState) => {
		const element = getState().reports.items[
			getState().reports.items.length - 1
		]
		try {
			dispatch(fetchingReportsStarted())
			const results = await ES.fetchReports({
				query: {
					bool: {
						must: { match_all: {} },
						filter: {
							range: {
								EventDatetime: {
									lt: element.date
								}
							}
						}
					}
				},
				sort: {
					EventDatetime: { order: 'desc' }
				},
				size: REPORTS_PER_PAGE
			})
			dispatch(fetchingReportsSuccess(results, true))
		} catch (err) {
			dispatch(fetchingReportsFailed())
		}
	}
}
