import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import history from './../history'


const TripDetails = (props) => {
	let theTrip = props.currentTrip
	// let theDate = theTrip.date.slice(0,10)
	// let theTime = theTrip.date.slice(14,19)
	// let hour = Number(theTime.slice(0,2))
	// let amorpm = ' am'
	// if (hour > 12){
	// 	amorpm = ' pm'
	// 	hour -= 12
	// }
	// let minute = theTime.slice(2)
	return (
		<Row>
			<Col xs={1}>
			</Col>
			<Col xs={10}>
				<h3>{theTrip.name}</h3>
				<h5>Party Size: {theTrip.attendees.length}</h5>
				<h5>Date: {theTrip.readableDate}</h5>
				<h5>Time: {theTrip.time}</h5>
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
