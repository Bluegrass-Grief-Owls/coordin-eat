import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


export const TripBuild = (props) => {

	return (
		<div>
			<div id="map">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<div id="friends">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<button>Make my trip!</button>

		</div>


	)
}



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		origins: state.origins//SAM: this is going to be an array of the points of origin
	}
}

export default connect(mapState)(TripBuild)

/**
 * PROP TYPES
 */
TripBuild.propTypes = {
	origins: PropTypes.array
}
