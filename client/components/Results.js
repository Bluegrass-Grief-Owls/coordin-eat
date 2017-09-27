import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


export const Results = (props) => {

	return (
		<div>
			<div id="map">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<div id="results-list">
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
		results: state.results//SAM: this is going to be an array of the results
	}
}

export default connect(mapState)(Results)

/**
 * PROP TYPES
 */
Results.propTypes = {
	results: PropTypes.array
}
