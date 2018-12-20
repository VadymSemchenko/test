import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Card extends Component {
	render() {
		return (
			<div className={'card' + (this.props.plain ? ' card-plain' : '')}>
				{this.props.header && (
					<div
						className={'header' + (this.props.hCenter ? ' text-center' : '')}
					>
						<h4 className="title">{this.props.title}</h4>
						<p className="category">{this.props.category}</p>
					</div>
				)}
				<div className={'content'}>{this.props.children}</div>
			</div>
		)
	}
}

Card.propTypes = {
	header: PropTypes.bool,
	plain: PropTypes.bool,
	hCenter: PropTypes.bool,
	title: PropTypes.string,
	category: PropTypes.string,
	children: PropTypes.element
}

Card.defaultProps = {
	header: true
}

export default Card
