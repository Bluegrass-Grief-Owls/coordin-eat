import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
	const {user} = props

	return (
		<div className='welcomeUser'>
			<h3 className='noMargin'>Welcome, {user.name}!</h3>
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	user: PropTypes.object
}
