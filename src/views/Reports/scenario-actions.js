import * as ES from '../../api/elasticsearch'

const REPORTS_PER_PAGE = process.env.REACT_APP_REPORTS_PER_PAGE || 50

export function fetchReports() {
	return async (dispatch, getState) => {
		try {
			// dispatch(fetchingReportsStart())
			const reports = await ES.fetchReports({
				query: {
					match_all: {}
				},
				sort: {
					EventDatetime: { order: 'desc' }
				},
				size: REPORTS_PER_PAGE
			})
			// dispatch(fetchingReportsSuccess())
		} catch (err) {
			console.log(err)
			// dispatch(fetchingReportsFailed())
		}
	}
}

export function fetchNewest() {
	return (dispatch, getState) => {
		const element = getState().reports.items[0]
		try {
			// dispatch(fetchingReportsStart())
			ES.fetchReports({
				query: {
					match_all: {},
					range: {
						EventDatetime: {
							lt: element.eventDate
						}
					}
				},
				sort: {
					EventDatetime: { order: 'desc' }
				},
				size: REPORTS_PER_PAGE
			})
			// dispatch(fetchingReportsSuccess())
		} catch (err) {
			console.log(err)
			// dispatch(fetchingReportsFailed())
		}
	}
}

export function fetchOlder() {
	return (dispatch, getState) => {
		const element = getState().reports.items[
			getState().reports.items.length - 1
		]
		try {
			// dispatch(fetchingReportsStart())
			ES.fetchReports({
				query: {
					match_all: {},
					range: {
						EventDatetime: {
							lt: element.eventDate
						}
					}
				},
				sort: {
					EventDatetime: { order: 'desc' }
				},
				size: REPORTS_PER_PAGE
			})
			// dispatch(fetchingReportsSuccess())
		} catch (err) {
			console.log(err)
			// dispatch(fetchingReportsFailed())
		}
	}
}
