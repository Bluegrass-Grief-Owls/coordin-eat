import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import history from './../history'


const TripDetails = (props) => {
	let theTrip = props.currentTrip

	return (
		<div>
			<Row>
				<Col xs={1}>
				</Col>
				<Col xs={10}>
					<h4>{theTrip.name}</h4>
					<h5>Party Size: {theTrip.attendees.length}</h5>
					<h5>{theTrip.readableDate} at {theTrip.time}</h5>
				</Col>
				<Col xs={1}>
				</Col>
			</Row>
			<Button>Actually, I don't want to go on this trip</Button>
		</div>
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
