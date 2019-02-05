import jwt from 'jsonwebtoken'
import unique from 'lodash/uniqBy'

export function extractCustomers(roles) {
	const split = roles.split(' ')
	const customers = split.map(part => {
		return {
			name: part.split('.')[0],
			id: part.split('.')[1]
		}
	})

	return unique(customers, 'id')
}

export function extractCustomerFromToken(token) {
	const decodedToken = jwt.decode(token, { json: true })
	return extractCustomers(decodedToken.roles)
}

export function extractUsernameFromToken(token) {
	const decodedToken = jwt.decode(token, { json: true })
	return decodedToken.user
}

export function pathSlugToPageName(slug) {
	switch (slug) {
		case 'objects':
			return 'Objects'
		case 'contentlist':
			return 'Content List'
		case 'addresstranslations':
			return 'Adress Translations'
		default:
			return slug
	}
}

export function parseResponseError(error, errorsArray = {}) {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				return errorsArray['400'] || 'Wrong request'
			default:
				return 'Something went wrong. Please again later.'
		}
	}
}
