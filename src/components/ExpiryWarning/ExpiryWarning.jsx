import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import './expiry-warning.scss'
import { logoutUser } from '../../store/auth/actions'

const INTERVAL_TIME_SECONDS = 1

class ExpiryWarning extends React.Component {
	state = {
		switch: false
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({
				switch: !this.state.switch
			})
		}, INTERVAL_TIME_SECONDS * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		const { expiryTime } = this.props
		const now = moment()
		const expiryMoment = moment(expiryTime)
		const diff = expiryMoment.diff(now, 'seconds')
		if (diff < INTERVAL_TIME_SECONDS) {
			this.props.logout()
			return null
		}
		const show = diff < process.env.REACT_APP_EXPIRY_WARNING_THRESHOLD_SHOW
		return (
			<div className={`expiry-warning ${show ? 'visible' : 'hidden'}`}>
				{`You're inactive for almost 15 minutes. Perform any actions or you will be log out in ${diff} seconds!`}
			</div>
		)
	}
}

ExpiryWarning.propTypes = {
	expiryTime: PropTypes.string,
	logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ expiryTime: state.auth.tokenExpireAt })
const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutUser())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExpiryWarning)
