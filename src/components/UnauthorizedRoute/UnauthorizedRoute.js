import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import { isAuthenticatedSelector } from '../../store/user/selectors'

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = rest

	return (
		<Route
			{...rest}
			render={props => {
				return !isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						push
						to={{
							pathname: '/auth/customers',
							state: { from: props.location, warning: true }
						}}
					/>
				)
			}}
		/>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticatedSelector(state)
})

const ConnectedProtectedRoute = connect(mapStateToProps)(UnauthorizedRoute)

export default ConnectedProtectedRoute
