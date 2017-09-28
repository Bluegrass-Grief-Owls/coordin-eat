import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

//MAPBOXGL ACCESS TOKEN: pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w






export const TripBuild = (props) => {


	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w' })



	return (
		<div>
			<div id="map">
				{/*THIS IS WHERE THE MAP GOES*/}
			</div>

			<div id="friends">

				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: "50vh",
						width: "50vw"
					}}>
					<Layer
						type="symbol"
						id="marker"
						layout={{ "icon-image": "marker-15" }}>
						<Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
					</Layer>
				</Map>


			</div>

			<button>Make my trip!</button>

		</div>


	)
}



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		originArray: state.originArray//SAM: this is going to be an array of the points of origin
	}
}

export default connect(mapState)(TripBuild)

/**
 * PROP TYPES
 */
TripBuild.propTypes = {
	originArray: PropTypes.array
}
