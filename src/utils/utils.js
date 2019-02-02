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
