import cx from 'classnames'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool } from 'prop-types'
import { toast } from 'react-toastify'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { personalInfoValidationSchema } from '../../../utils/validationSchemas'
import { PERSON } from '../../../assets/Icons'
import { completeUser } from '../scenario-actions'
import Spinner from 'react-spinner-material'
import { isLoadingSelector, errorSelector } from '../../../store/user/selectors'
import '../sign-up-form.scss'

class PersonalInfoSubForm extends Component {
	static propTypes = {
		buttonTitle: string,
		values: shape({
			firstName: string,
			lastName: string
		}).isRequired,
		errors: shape({
			firstName: string,
			lastName: string
		}),
		isValid: bool.isRequired,
		setFieldTouched: func.isRequired,
		handleChange: func.isRequired,
		email: string.isRequired,
		isLoading: bool.isRequired,
		completeUser: func.isRequired,
		serverError: string.isRequired
	}

	static defaultProps = {
		buttonTitle: 'Sign Up',
		isLoading: true
	}

	componentDidUpdate(prevProps) {
		if (this.props.serverError !== prevProps.serverError) {
			toast.error(this.props.serverError, {
				hideProgressBar: true,
				autoClose: this.debounceTime
			})
		}
	}

	debounceTime = 1000

	onSubmit = event => {
		event.preventDefault()
		const {
			isValid,
			errors,
			values: { firstName, lastName },
			completeUser
		} = this.props
		const checkAndSubmit = () => {
			if (isValid !== true) {
				Object.values(errors).forEach(message => {
					toast.error(message, {
						hideProgressBar: true,
						autoClose: this.debounceTime
					})
				})
				return
			} else {
				completeUser({
					firstName,
					lastName
				})
			}
		}
		debounce(checkAndSubmit, 1000, { leading: true })()
	}

	render() {
		const {
			buttonTitle,
			values,
			isValid,
			setFieldTouched,
			handleChange,
			isLoading
		} = this.props
		return (
			<form onSubmit={this.onSubmit}>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'input-icon'} alt={'input-icon'} />
					</div>
					<input
						value={values.firstName}
						name={'firstName'}
						placeholder={'Your first name'}
						required={true}
						onChange={handleChange}
						onBlur={() => setFieldTouched('firstName')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'input-icon'} alt={'input-icon'} />
					</div>
					<input
						value={values.lastName}
						name={'lastName'}
						placeholder={'Your last name'}
						required={true}
						onChange={handleChange}
						onBlur={() => setFieldTouched('lastName')}
					/>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<input
						type="submit"
						className={cx({
							'login-button': true,
							invalid: !isValid
						})}
						value={buttonTitle}
					/>
				)}
			</form>
		)
	}
}

const mapStateToProps = state => ({
	isLoading: isLoadingSelector(state),
	serverError: errorSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			completeUser
		},
		dispatch
	)

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withFormik({
		mapPropsToValues: () => ({
			firstName: '',
			lastName: ''
		}),
		validationSchema: personalInfoValidationSchema
	})
)(PersonalInfoSubForm)
