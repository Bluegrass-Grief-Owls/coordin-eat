import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import FriendForm from './FriendForm'



export const TripBuild = (props) => {



	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w' })

	const events = {
		onClick: (e) => {
			let lng = e.transform._center.lng
			let lat = e.transform._center.lat
			console.log("long:", lng, "lat:", lat)
		},
	}

	console.log(events)

	const test = [1,2,3,4,5]

	return (
		<div>
			<div id="map">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<div id="friends">

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

			{/*this is eventually going to be the friendArray from store*/}
			{test.map(form => {
				return <FriendForm />
			})}

			<button>Make my trip!</button>

		</div>


	)
}



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		friendArray: state.friendArray,//SAM: this is going to be an array of the points of origin
		email: state.user.email
	}
}

export default connect(mapState)(TripBuild)

/**
 * PROP TYPES
 */
TripBuild.propTypes = {
	friendArray: PropTypes.array
}
