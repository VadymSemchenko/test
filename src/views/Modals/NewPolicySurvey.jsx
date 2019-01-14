import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import { EXPIRATION_TYPE, EXPIRATION_TYPE_OPTIONS } from '../../enums'
import { Footer } from './commons'
import './modals.scss'

class NewPolicySurvey extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expiryType: EXPIRATION_TYPE.HARD,
			services: [],
			applications: [],
			threatManagement: 1
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)
	onSourceChange = val => this.changeField('source', val)
	onDestinationChange = val => this.changeField('destination', val)
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onPotentialServiceChange = val => this.changeField('potentialService', val)
	onPotentialApplicationChange = val =>
		this.changeField('potentialApplication', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onThreatManagementChange = val => this.changeField('threatManagement', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onFinish(this.state)
		}
	}

	onNewService = () => {
		this.setState({
			services: [
				...this.state.services,
				this.props.options.find(o => o.id === this.state.potentialService.value)
			],
			potentialService: ''
		})
	}

	onRemoveService = index => {
		this.setState({
			services: this.state.services.filter((s, i) => i !== index)
		})
	}

	onNewApplication = () => {
		this.setState({
			applications: [
				...this.state.applications,
				this.state.potentialApplication
			],
			potentialApplication: ''
		})
	}

	onRemoveApplication = index => {
		this.setState({
			applications: this.state.applications.filter((a, i) => i !== index)
		})
	}

	validate() {
		return true
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded new-policy-survey'}>
					<Card header={false}>
						<Form.Group label={'Name'}>
							<Form.Text
								value={this.state.name}
								onChange={this.onNameChange}
								placeholder={'Name'}
							/>
						</Form.Group>
						<div className={'form-row'}>
							<Form.Group label={'Source'}>
								<Form.Text
									value={this.state.source}
									onChange={this.onSourceChange}
									placeholder={'Source'}
								/>
							</Form.Group>
							<Form.Group label={'Destination'}>
								<Form.Text
									value={this.state.destination}
									onChange={this.onDestinationChange}
									placeholder={'Destination'}
								/>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group label={'Expiry'}>
								<Form.Text
									value={this.state.expiry}
									onChange={this.onExpiryChange}
									placeholder={'Expiry'}
								/>
							</Form.Group>
							<Form.Group center={true} label={''}>
								<Form.Toggle
									selected={this.state.expiryType}
									selectedClass={'toggle-selected'}
									onChange={this.onExpiryTypeChange}
									options={EXPIRATION_TYPE_OPTIONS}
								/>
							</Form.Group>
						</div>
					</Card>

					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group full={true} label={'Services'}>
								{this.state.services.map((s, index) => (
									<div
										key={`services-index-${index}-${s.id}`}
										className={'policy--services_single'}
									>
										<p className={'medium strong'}>{`${s.name} - ${
											s.protocol ? 'TCP' : 'UDP'
										}/${s.port} `}</p>
										<i
											className={'pe-7s-close red-delete-icon'}
											onClick={() => this.onRemoveService(index)}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Select
										value={this.state.potentialService}
										onChange={this.onPotentialServiceChange}
										placeholder={'Service'}
										options={[
											...this.props.options.map(o => ({
												value: o.id,
												label: `${o.protocol}/${o.port} (${o.name})`
											}))
											// { value: -1, label: 'Create new service' }
										]}
									/>
									<AddButton
										onClick={this.onNewService}
										className={'space-left'}
									/>
								</div>
							</Form.Group>

							<Form.Group full={true} label={'Applications'}>
								{this.state.applications.map((a, index) => (
									<div
										key={`applications-index-${index}`}
										className={'policy--application_single'}
									>
										<p className={'medium strong'}>{a}</p>
										<i
											className={'pe-7s-close red-delete-icon'}
											onClick={() => this.onRemoveApplication(index)}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Text
										value={this.state.potentialApplication}
										onChange={this.onPotentialApplicationChange}
										placeholder={'Application'}
									/>
									<AddButton
										onClick={this.onNewApplication}
										className={'space-left'}
									/>
								</div>
							</Form.Group>
						</div>
						<Form.Group center={true} label={'Threat management'}>
							<Form.Toggle
								selected={this.state.threatManagement}
								selectedClass={'toggle-selected'}
								onChange={this.onThreatManagementChange}
								options={[
									{ value: 0, label: 'No' },
									{ value: 1, label: 'Yes' }
								]}
							/>
						</Form.Group>
					</Card>

					<Card header={false}>
						<Form.Group full={true} label={'Description'}>
							<Form.Text
								value={this.state.description}
								onChange={this.onDescriptionChange}
								placeholder={'Device description'}
								multiline={true}
								rows={4}
							/>
						</Form.Group>

						<div className={'form-row'} />
					</Card>
				</div>
				<div className={'wedge-modal__footer'}>
					<Footer onClick={this.onFinish} edit={this.props.edit} />
				</div>
			</React.Fragment>
		)
	}
}

NewPolicySurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	edit: PropTypes.bool,
	item: PropTypes.object,
	options: PropTypes.array.isRequired
}

const ConnectedServiceField = connect(
	state => ({
		options: state.ecosystems.dictionaries.services
	}),
	null
)(NewPolicySurvey)

NewPolicySurvey.Footer = Footer
export default ConnectedServiceField
