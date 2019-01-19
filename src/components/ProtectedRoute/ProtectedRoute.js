import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = rest

	return (
		<Route
			{...rest}
			render={props => {
				return auth.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						push
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
			}}
		/>
	)
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const ConnectedProtectedRoute = connect(
	mapStateToProps,
	null
)(ProtectedRoute)

export default ConnectedProtectedRoute
