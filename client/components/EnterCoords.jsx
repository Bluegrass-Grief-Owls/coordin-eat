import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import FriendForm from './FriendForm.jsx'
import {addFriend, calculate} from '../store'
import {Col, Row, Button} from 'react-bootstrap'
import history from './../history'


/**
 * WHAT IS THE PROCESS BY WHICH A USER CREATES A NEW TRIP
 * 1. Navigate to Create a Trip Page
 * 		-you see:
 * 				a. a map
 * 				b. a header saying "Click on the map to add friend's location" -- ONLY FOR MVP
 * 				b1. an add a friend button --- NOT ON MVP
 * 				c. submit button
 *
 * 2. Add a friend
 * 		a. click button
 * 			i. button prompts user to click a location on the map
 * 		b. click location on map
 * 			i. the coordinates of the location are dispatched to the friendArray on store
 * 			ii. the view re=renders, displaying <li> for each element in friendArray from store
 *
 * 3. click sumbit button (TODO)
 */

let friendCounter = 0

export const TripBuild = (props) => {
	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'})


	const {addNewFriend, friendArray } = props


	const events = {
		onClick: (e) => {
			const lng = e.transform._center.lng
			const lat = e.transform._center.lat
			const newCoordinate = [lat,lng]
			addNewFriend(newCoordinate)
		},
	}




	return (
		<Row>
			<Col xs={12}>
				<h2 className='alignCenter'>CLICK ON THE MAP TO ADD THE LOCATION OF A FRIEND</h2>
			</Col>
			<Col xs={12}>
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					center={{lng: -74.0119549, lat: 40.7061336}}
					containerStyle={{
						height: '50vh',
						width: '100%'
					}}
					onClick={events.onClick}>
					{//<Layer
					// 	onDrag={events.onDrag}
					// 	type="symbol"
					// 	id="marker"
					// 	layout={{ 'icon-image': 'marker-15' }}>
					// 	{/*<Feature coordinates={[ 40.763434614755994, -73.976086754748 ]}/>*/}
					// </Layer>
					}
				</Map>
			</Col>
			<Col xs={1}></Col>
			<Col xs={10}>
				{friendArray.map(origin => {
					friendCounter++
					return (
						<li key={friendCounter}>{origin}</li>
					)
				})}
				<Button className='tripButton' onClick={() => {
					props.calculateTrip(props.friendArray)
					history.push('/destinations')
				}}>Make my trip!</Button>
			</Col>
			<Col xs={1}></Col>
		</Row>
	)
}



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		friendArray: state.TripBuild,//SAM: this is going to be an array of the points of origin
	}
}

const mapDispatch = (dispatch) => {
	return {
		addNewFriend: (friend) => dispatch(addFriend(friend)),
		calculateTrip: (friendArray) => dispatch(calculate(friendArray))
	}
}

export default connect(mapState, mapDispatch)(TripBuild)

/**
 * PROP TYPES
 */
TripBuild.propTypes = {
	friendArray: PropTypes.array
}
