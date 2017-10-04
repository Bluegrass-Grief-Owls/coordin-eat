import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import {declineInvitation, setCoordinates} from './../store'



const ConfirmTrip = (props) => {

	let attendeeArray = props.currentTrip.attendees
	let isTripOwner = true

	console.log('attendee array', attendeeArray)

	let individualTrip = props.currentTrip.attendees.filter(attendee => {
		return attendee.user.id == props.user.id
	})[0]

	console.log('from confirming', props)

	console.log('individual trip test', individualTrip)

	// let attending = false

	let lat, long
	navigator.geolocation.getCurrentPosition(function(position) {
		lat = position.coords.latitude
		long = position.coords.longitude
		console.log(lat, long)
	})

	const { removeSelf, giveCoords } = props

	return (
		<div>


			{ individualTrip && !individualTrip.origin ?

				<div>

					<button onClick={() => 	giveCoords([lat,long], props.currentTrip.id,props.user.id)}>I'm coming, here's my coordinates</button>
					<button onClick={() => removeSelf(props.currentTrip.id,props.user.id)}>I cannot attend</button>
				</div>
				:
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
			}
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
		giveCoords(coords,tripId, userId) {
			dispatch(setCoordinates(coords, tripId, userId))

		}
	}
}




export default connect(mapState, mapDispatch)(ConfirmTrip)
