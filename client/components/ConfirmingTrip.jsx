import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import {declineInvitation, setCoordinates, setCurrentCoords } from './../store'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'



const ConfirmTrip = (props) => {
	const {removeSelf, giveCoords} = props

	let isTripOwner = false
	if(props.currentTrip.ownerId === props.user.id){
		isTripOwner = true
	}

	let attendeeArray = props.currentTrip.attendees
	let myAttendance = attendeeArray.filter(attendee => {
		return attendee.user.id === props.user.id
	})[0]

	if(props.currentLocation[0] === null){
		navigator.geolocation.getCurrentPosition(function(position) {
			let currentCoords = [Number(position.coords.latitude.toFixed(6)), Number(position.coords.longitude.toFixed(6))]
			console.log(currentCoords)
			props.setLocation(currentCoords)
		})
	}

	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'})

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
								<th>location</th>
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
											{attendee.origin ? (<td>{attendee.origin}</td>) : (<td>Awaiting Reply</td>)}
										</tr>
									)
								})
							}
						</tbody>
					</Table>
					{
						isTripOwner ? (<Button className='tripButton'>Procced to Voting</Button>) : ''
					}
				</Col>
				<Col xs={1}></Col>
			</Row>
		)
	} else {
		if (props.currentLocation[0] !== null) {
			return (
				<Row>
					<Col xs={1}></Col>
					<Col xs={10}>
						<h5>Center the map on your starting point.</h5>
						<h5>Then click it to set those coordinates!</h5>
						<Map
							id='theMap'
							name='theMap'
							style="mapbox://styles/mapbox/streets-v9"
							center={{lng: props.currentLocation[1], lat: props.currentLocation[0]}}
							zoom={[17]}
							onClick={props.setCoords}
							containerStyle={{
								height: '50vh',
								width: '100%'
							}} />
					</Col>
					<Col xs={1}></Col>
					<Button className='tripButton marginLeft15 displayBlock' type='submit' onClick={(evt) => giveCoords(evt) /*giveCoords([lat,long], props.currentTrip.id,props.user.id)*/}>I'm coming, here's my coordinates</Button>
					<Button className='tripButton marginLeft15 displayBlock' onClick={() => removeSelf(props.currentTrip.id,props.user.id)}>I cannot attend</Button>
				</Row>
			)
		} else {
			return(
				<h3>Loading . . .</h3>
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
		removeSelf(tripId,userId) {
			dispatch(declineInvitation(tripId, userId))
		},
		giveCoords(evt) {
			evt.preventDefault()
			let target = document.getElementsByClassName('mapboxgl-canvas')
			console.log(target.getCenter())
			//dispatch(setCoordinates(coords, tripId, userId))
		},
		setCoords(evt) {
			console.log(evt)
		},
		setLocation(coordArray){
			dispatch(setCurrentCoords(coordArray))
		}
	}
}

export default connect(mapState, mapDispatch)(ConfirmTrip)
