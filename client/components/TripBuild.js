import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import FriendForm from './FriendForm'
import {addFriend, calculate} from '../store'


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


export const TripBuild = (props) => {

	console.log('propd', props)

	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w' })


	const {addNewFriend, friendArray } = props


	const events = {
		onClick: (e) => {
			const lng = e.transform._center.lng
			const lat = e.transform._center.lat
			const newCoordinate = [lat,lng]
			addNewFriend(newCoordinate)
			console.log("long:", lng, "lat:", lat)
		},
	}




	return (
		<div>
			<div id="map">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<div id="friends">

				<h2>CLICK ON THE MAP TO ADD A LOCATION OF A FRIEND</h2>

				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: '50vh',
						width: '50vw'
					}}
					onClick={events.onClick}
				>
					<Layer
						onDrag={events.onDrag}
						type="symbol"
						id="marker"
						layout={{ 'icon-image': 'marker-15' }}>
						<Feature coordinates={[ 40.763434614755994, -73.976086754748 ]}/>
					</Layer>
				</Map>


			</div>

			{friendArray.map(origin => {
				return (
					<li>{origin}</li>
				)
			})}

			<button onClick={() => props.calculateTrip(props.friendArray)}>Make my trip!</button>

		</div>


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
