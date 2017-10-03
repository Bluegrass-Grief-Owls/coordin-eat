import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
// import {Col, Row, Button, Table} from 'react-bootstrap'
import {declineInvitation} from './../store'


const ConfirmTrip = (props) => {

	console.log('from confirming', props)

	navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position.coords.latitude, position.coords.longitude);
	});

	const { removeSelf } = props

	return (
		<div>
			<button>I'm coming, here's my coordinates</button>
			<button onClick={() => removeSelf(props.currentTrip.id,props.user.id)}>why</button>
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
		}
	}
}




export default connect(mapState, mapDispatch)(ConfirmTrip)
