import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FriendForm from './FriendForm.jsx'
import {addFriend, calculate} from '../store'
import {Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import history from './../history'

let dateChoice = ''

const BuildTrip = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<FormGroup
				controlId="tripName"
			>
				<ControlLabel>Trip Name</ControlLabel>
				<FormControl
					type="text"
					name="tripName"
					placeholder="Enter trip name"
				/>
			</FormGroup>
			<Button className='tripButton' type='submit' >Make my trip!</Button>
		</form>
	)
}

	



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		friendArray: state.TripBuild
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit: function(evt) {
			evt.preventDefault()
			console.log('Trip name:', evt.target.tripName.value, 'Date:', evt.target.date.value)
		}
	}
}

export default connect(mapState, mapDispatch)(BuildTrip)

/**
 * PROP TYPES
 */
BuildTrip.propTypes = {
	// friendArray: PropTypes.array
}
