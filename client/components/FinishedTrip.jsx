import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import history from './../history'


const TripDetails = (props) => {
	let theTrip = props.currentTrip
	let theYelp = JSON.parse(theTrip.yelpString)
	let attendeeString = ''
	theTrip.attendees.forEach(attendee => {
		attendeeString += (', ' + attendee.user.name)
	})
	attendeeString = attendeeString.slice(2)
	return (
		<Row>
			<Col xs={1}>
			</Col>
			<Col xs={10} className='finishedContainer'>
				<h3>{theTrip.name}</h3>
				<h5>Destination: <a className='fontAccentColor' href={theYelp.url}>{theYelp.name}</a></h5>
				<h5>Date: {theTrip.readableDate} at {theTrip.time}</h5>
				<h5>Attendees: {attendeeString}</h5>
			</Col>
			<Col xs={1}>
			</Col>
		</Row>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		currentTrip: state.currentTrip
	}
}

export default connect(mapState)(TripDetails)

/**
 * PROP TYPES
 */
TripDetails.propTypes = {
	// friendArray: PropTypes.array
}
