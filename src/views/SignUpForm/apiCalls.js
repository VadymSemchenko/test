import { rest, auth } from '../../api/rest'

export const createUser = email => auth.post('/v2/users', { email })

export const loginUserForToken = email => {
	return auth.post(`v2/auth/login`, {
		username: email,
		password: 'VeryLongDefP@SS'
	})
}

export const fulfillUser = ({ email, fullName }) => {
	const path = `/v2/users/${email}`
	return rest.put(path, { email, fullName })
}

export const readUserData = username => rest.get(`v2/users/${username}`)
