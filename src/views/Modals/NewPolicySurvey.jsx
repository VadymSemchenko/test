import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import AdvancedContainer from '../../components/AdvancedContainer/AdvancedContainer'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import {
	ACTION_TYPES,
	ACTION_TYPES_OPTIONS,
	EXPIRATION_TYPE,
	EXPIRATION_TYPE_OPTIONS,
	MOCK_OPTIONS
} from '../../enums'
import { Footer } from './commons'
import './modals.scss'

class NewPolicySurvey extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expiryType: EXPIRATION_TYPE.HARD,
			services: [],
			sources: [],
			destinations: [],
			applications: [],
			threatManagement: 2,
			actionType: ACTION_TYPES.ALLOW
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)
	onNotesChange = val => this.changeField('notes', val)
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onActionTypeChange = val => this.changeField('actionType', val)
	onThreatManagementChange = val => this.changeField('threatManagement', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onFinish(this.state)
		}
	}

	onPotentialItemChange = (value, field) => {
		this.changeField(`potential${field.capitalize()}`, value)
	}

	onNewItemManual = field => {
		this.setState({
			[field]: [
				...this.state[field],
				this.state[`potential${field.capitalize()}`]
			],
			[`potential${field.capitalize()}`]: ''
		})
	}

	onRemoveItem = (index, field) => {
		this.setState({
			[field]: this.state[field].filter((s, i) => i !== index)
		})
	}

	onNewService = () => {
		this.setState({
			services: [
				...this.state.services,
				this.props.options.find(
					o => o.id === this.state.potentialServices.value
				)
			],
			potentialServices: ''
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
						<div className={'form-row'}>
							<Form.Group required={true} label={'Name'}>
								<Form.Text
									value={this.state.name}
									onChange={this.onNameChange}
									placeholder={'Enter policy name'}
								/>
							</Form.Group>
							<Form.Group
								full={true}
								label={'Description'}
								extraClass={'description-container'}
							>
								<Form.Text
									value={this.state.description}
									onChange={this.onDescriptionChange}
									placeholder={'Device description'}
								/>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group required={true} label={'Sources'}>
								{this.state.sources.map((a, index) => (
									<div
										key={`sources-index-${index}`}
										className={'policy--application_single'}
									>
										<p className={'medium strong'}>{a}</p>
										<i
											className={'pe-7s-close red-delete-icon'}
											onClick={() => this.onRemoveItem(index, 'sources')}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Text
										value={this.state.potentialSources}
										onChange={val => this.onPotentialItemChange(val, 'sources')}
										placeholder={'Add new source'}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('sources')}
										className={'space-left'}
									/>
								</div>
							</Form.Group>

							<Form.Group
								required={true}
								extraClass={'services-container'}
								label={'Services'}
							>
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
											onClick={() => this.onRemoveItem(index, 'services')}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Select
										value={this.state.potentialServices}
										onChange={val =>
											this.onPotentialItemChange(val, 'services')
										}
										placeholder={'Service'}
										options={[
											...this.props.options.map(o => ({
												value: o.id,
												label: `${o.protocol}/${o.port} (${o.name})`
											}))
										]}
									/>
									<AddButton
										onClick={this.onNewService}
										className={'space-left'}
									/>
								</div>
							</Form.Group>

							<Form.Group
								required={true}
								extraClass={'applications-container'}
								label={'Applications'}
							>
								{this.state.applications.map((a, index) => (
									<div
										key={`applications-index-${index}`}
										className={'policy--application_single'}
									>
										<p className={'medium strong'}>{a}</p>
										<i
											className={'pe-7s-close red-delete-icon'}
											onClick={() => this.onRemoveItem(index, 'applications')}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Text
										value={this.state.potentialApplications}
										onChange={val =>
											this.onPotentialItemChange(val, 'applications')
										}
										placeholder={'Application'}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('applications')}
										className={'space-left'}
									/>
								</div>
							</Form.Group>
							<Form.Group
								required={true}
								extraClass={'destinations-container'}
								label={'Destination'}
							>
								{this.state.destinations.map((a, index) => (
									<div
										key={`destinations-index-${index}`}
										className={'policy--destination_single'}
									>
										<p className={'medium strong'}>{a}</p>
										<i
											className={'pe-7s-close red-delete-icon'}
											onClick={() => this.onRemoveItem(index, 'destinations')}
										/>
									</div>
								))}
								<div className={'flex-row baseline'}>
									<Form.Text
										value={this.state.potentialDestinations}
										onChange={val =>
											this.onPotentialItemChange(val, 'destinations')
										}
										placeholder={'Add new destination'}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('destinations')}
										className={'space-left'}
									/>
								</div>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group required center={true} label={'Action'}>
								<Form.Toggle
									selected={this.state.actionType}
									selectedClass={'toggle-selected'}
									onChange={this.onActionTypeChange}
									options={ACTION_TYPES_OPTIONS}
								/>
								<label className={'checkbox-label wedge-checkbox-container'}>
									<input
										type="checkbox"
										checked={this.state.threatManagement}
										onChange={ev =>
											this.onThreatManagementChange(ev.target.checked)
										}
									/>
									<span className={'checkmark'} />
									<span className={'title'}>Threat management</span>
								</label>
							</Form.Group>
						</div>
						<div className={'advance'}>
							<AdvancedContainer>
								<div className={'form-row'}>
									<Form.Group
										extraClass={'notes-container'}
										full
										label={'Notes'}
									>
										<Form.Text
											value={this.state.notes}
											onChange={this.onNotesChange}
											placeholder={'Notes'}
											multiline={true}
											rows={8}
										/>
									</Form.Group>
									<Form.Group extraClass={'expiry-container'} label={'Expiry'}>
										<Form.Text
											value={this.state.expiry}
											onChange={this.onExpiryChange}
											placeholder={'Expiry'}
										/>
										<Form.Toggle
											selected={this.state.expiryType}
											selectedClass={'toggle-selected'}
											onChange={this.onExpiryTypeChange}
											options={EXPIRATION_TYPE_OPTIONS}
										/>
									</Form.Group>
									<div className={'actions-container'}>
										<Form.Group label={'URL Filter'}>
											<Form.Select
												value={this.state.urlFilter}
												onChange={this.onAssetChange}
												placeholder={'Abused drug'}
												options={MOCK_OPTIONS}
											/>
										</Form.Group>
										<Form.Group label={'File Type'}>
											<Form.Select
												value={this.state.fileType}
												onChange={this.onAssetChange}
												placeholder={'XML'}
												options={MOCK_OPTIONS}
											/>
										</Form.Group>
										<Form.Group label={'Pattern Filter'}>
											<Form.Select
												value={this.state.patternFilter}
												onChange={this.onAssetChange}
												placeholder={'Data filter'}
												options={MOCK_OPTIONS}
											/>
										</Form.Group>
									</div>
								</div>
							</AdvancedContainer>
						</div>
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
