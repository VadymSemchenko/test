import React from 'react'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import './modals.scss'

const CATEGORIES = [
	{
		value: 0,
		label: 'Category #1'
	},
	{
		value: 1,
		label: 'Category #2'
	}
]

export default function NewObjectType() {
	return (
		<div className={'modal__content padded new-object-type'}>
			<Card header={false}>
				<div className={'form-row'}>
					<Form.Group label={'Name'}>
						<Form.Text placeholder={'Name'} />
					</Form.Group>
					<Form.Group label={'Profile Group'}>
						<Form.Select
							placeholder={'Select profile group'}
							options={CATEGORIES}
						/>
					</Form.Group>
				</div>
				<div className={'form-row'}>
					<Form.Group label={'Category'}>
						<Form.Select placeholder={'Select category'} options={CATEGORIES} />
					</Form.Group>
					<Form.Group label={'Type'}>
						<div className={'flex-row baseline'}>
							<Form.Select placeholder={'Select type'} options={CATEGORIES} />
							<AddButton className={'space-left'} onClick={() => {}} />
						</div>
					</Form.Group>
				</div>
				<Form.Group label={'Asset value'}>
					<Form.Select
						placeholder={'Select asset value'}
						options={CATEGORIES}
					/>
				</Form.Group>
				<div className={'form-row'}>
					<Form.Group label={'Expiry'}>
						<Form.Text placeholder={'Expiry'} />
					</Form.Group>
					<Form.Group center={true} label={''}>
						<Form.Toggle
							selected={0}
							selectedClass={'expire-selected'}
							onChange={() => {}}
							options={[
								{ value: 0, label: 'Hard' },
								{ value: 1, label: 'Soft' }
							]}
						/>
					</Form.Group>
				</div>
			</Card>
			<Card header={false}>
				<Form.Group full={true} label={'Description'}>
					<Form.Text
						placeholder={'Device description'}
						multiline={true}
						rows={4}
					/>
				</Form.Group>
			</Card>
		</div>
	)
}
