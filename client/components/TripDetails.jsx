import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap'
import history from './../history'


const TripDetails = (props) => {
	let theTrip = props.currentTrip

	return (
		<div>
			<Row>
				<Col xs={1}>
				</Col>
				<Col xs={10}>
					<h3>{theTrip.name}</h3>
					<h4 className='fontMainColorLight'>Party Size: {theTrip.attendees.length}</h4>
					<h4 className='fontMainColorLight'>{theTrip.readableDate} at {theTrip.time}</h4>
				</Col>
				<Col xs={1}>
				</Col>
			</Row>
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
	currentTrip: PropTypes.object
}
