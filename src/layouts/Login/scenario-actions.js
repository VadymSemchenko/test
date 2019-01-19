import history from '../../history'

export function login(credentials, redirect) {
	try {
		if (redirect) {
			history.push(redirect)
		} else {
			history.goBack()
		}
	} catch (err) {
		console.error(err)
	}
}
