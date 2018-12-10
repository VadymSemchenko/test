import axios from 'axios'

const elasticsearch = axios.create({
	baseURL: process.env.REACT_APP_ES_CLUSTER_URL
})

const REPORTS_INDEX = 'elastictest'

export function fetchReports(query) {
	return elasticsearch
		.post(`${REPORTS_INDEX}/_search`, query)
		.then(response => {
			return response.data.hits.hits
		})
		.map(report => report._source)
		.map(report => {
			return {
				eventDate: report.EventDatetime
			}
		})
}
