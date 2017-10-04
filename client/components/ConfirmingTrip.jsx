import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
// import {Col, Row, Button, Table} from 'react-bootstrap'
import {declineInvitation, setCoordinates} from './../store'


const ConfirmTrip = (props) => {

	console.log('from confirming', props)

	let lat, long
	navigator.geolocation.getCurrentPosition(function(position) {
		lat = position.coords.latitude
		long = position.coords.longitude
		console.log(lat, long)
	})

	const { removeSelf, giveCoords } = props

	return (
		<div>
			<button onClick={() => giveCoords([lat,long],props.currentTrip.id)}>I'm coming, here's my coordinates</button>
			<button onClick={() => removeSelf(props.currentTrip.id,props.user.id)}>I cannot attend</button>
		</div>
	)
}


/**
 * CONTAINER
 */

const mapState = (state) => {
	return {
		user: state.user,
		currentTrip: state.currentTrip
	}
}

const mapDispatch = (dispatch) => {
	return {
		removeSelf(tripId,userId) {
			dispatch(declineInvitation(tripId, userId))
		},
		giveCoords(coords,tripId) {
			dispatch(setCoordinates(coords, tripId))
		}
	}
}




export default connect(mapState, mapDispatch)(ConfirmTrip)
