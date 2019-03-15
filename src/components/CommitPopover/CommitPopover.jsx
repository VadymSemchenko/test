import React from 'react'
import { Popover, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './commit-popover.scss'

const commits = [
	{
		user: 'John',
		avatar: '',
		action: 'Move',
		actionDetails: 'Xeoma.acreto.io',
		details: '.../Objects/Address'
	},
	{
		user: 'Mark',
		avatar: '',
		action: 'Modify',
		actionDetails: 'Access to Xeoma.acreto.io',
		details: '.../Objects/Address'
	},
	{
		user: 'Ali',
		avatar: '',
		action: 'Delete',
		actionDetails: 'Xeoma.acreto.io',
		details: '.../Objects/Address'
	},
	{
		user: 'Mark',
		avatar: '',
		action: 'Modify',
		actionDetails: 'Access to Xeoma.acreto.io',
		details: '.../Objects/Address'
	},
	{
		user: 'Ali',
		avatar: '',
		action: 'Delete',
		actionDetails: 'Xeoma.acreto.io',
		details: '.../Objects/Address'
	}
]

export default class CommitPopover extends React.Component {
	render() {
		return (
			<Popover
				id="popover-commit"
				placement="bottom"
				target={this.props.target}
				{...this.props}
			>
				<div className="commit-list">
					{commits.map((c, index) => (
						<SingleCommit key={`single-commit-index-${index}`} commit={c} />
					))}
				</div>
				<div className="commit-actions">
					<Button
						className="commit-button button"
						bsStyle={'primary'}
						onClick={() => {}}
					>
						Commit
					</Button>
					<Button className="revert-button button" onClick={() => {}}>
						Revert
					</Button>
				</div>
			</Popover>
		)
	}
}

function SingleCommit(props) {
	return (
		<div className="single-commit">
			<div className="single-commit--user-container">
				<div className="user-avatar" />
				<p className="user-name">{props.commit.user}</p>
			</div>
			<div className="single-commit--details">
				<p className="details--first-line">{props.commit.details}</p>
				<p className="details--second-line">
					<span className="action-name">{props.commit.action}</span> -{' '}
					<span className="action-details">{props.commit.actionDetails}</span>
				</p>
			</div>
		</div>
	)
}

SingleCommit.propTypes = {
	commit: PropTypes.shape({
		user: PropTypes.string.isRequired,
		avatar: PropTypes.string.isRequired,
		details: PropTypes.string.isRequired,
		action: PropTypes.string.isRequired,
		actionDetails: PropTypes.string.isRequired
	})
}

CommitPopover.propTypes = {
	target: PropTypes.any.isRequired
}
