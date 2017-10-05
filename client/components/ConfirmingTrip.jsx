import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import {setCurrentCoords, declineInvitation, updateTrip} from './../store'
import {ConfirmingTripMap} from './index.js'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'



const ConfirmTrip = (props) => {

	let isTripOwner = false
	if(props.currentTrip.ownerId === props.user.id){
		isTripOwner = true
	}

	let attendeeArray = props.currentTrip.attendees
	let myAttendance = attendeeArray.filter(attendee => {
		return attendee.user.id === props.user.id
	})[0]

	if(myAttendance && myAttendance.origin){
		return(
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<h3>Here's Who's Coming!</h3>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Location</th>
							</tr>
						</thead>
						<tbody>
							{
								attendeeArray.map((attendee, idx) =>{
									return (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{attendee.user.name}</td>{
											}
											{attendee.origin ? (<td>{attendee.origin[0]}, {attendee.origin[1]}</td>) : (<td>Awaiting Reply</td>)}
										</tr>
									)
								})
							}
						</tbody>
					</Table>
					{
						isTripOwner ? (<Button className='tripButton' onClick={() => {
							props.moveToVoting(props.currentTrip)}}>Procced to Voting</Button>) : ''
					}
				</Col>
				<Col xs={1}></Col>
			</Row>
		)
	} else {
		if(props.currentLocation[0] === null){
			navigator.geolocation.getCurrentPosition(function(position) {
				let currentCoords = [Number(position.coords.latitude.toFixed(6)), Number(position.coords.longitude.toFixed(6))]
				console.log('Your current location', currentCoords)
				props.setLocation(currentCoords)
			})
		}
		if (props.currentLocation[0] !== null) {
			return (
				<Row>
					<Col xs={1}></Col>
					<Col xs={10}>
						<h5>Center the map on your starting point.</h5>
						<ConfirmingTripMap coordinates={props.currentLocation}/>
					</Col>
					<Col xs={1}></Col>
				</Row>
			)
		} else {
			return(
				<h3 id='putMapHere'>Loading . . .</h3>
			)
		}
	}
}


/**
 * CONTAINER
 */

const mapState = (state) => {
	return {
		user: state.user,
		currentTrip: state.currentTrip,
		currentLocation: state.currentLocation
	}
}

const mapDispatch = (dispatch) => {
	return {
		setLocation(coordArray){
			dispatch(setCurrentCoords(coordArray))
		},
		moveToVoting(trip){
			let originArray = []
			trip.attendees.forEach(attendee => {
				if(attendee.origin){
					originArray.push(attendee.origin)
				} else {
					dispatch(declineInvitation(trip.id, attendee.userId))
				}
			})
			//We should use a midpoint formula, but for now I'm just gonna pick a random coord
			let meetup = originArray[Math.floor(Math.random() * originArray.length)]
			dispatch(updateTrip({status: 'voting', meetup}, trip.id))
		}
	}
}

export default connect(mapState, mapDispatch)(ConfirmTrip)
