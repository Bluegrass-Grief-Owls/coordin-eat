import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import {Col, Row, Button} from 'react-bootstrap'
import history from './../history'

export const TripDirections = (props) => {
	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'})
	
	if(props.meetingPlace){
		const meetingPlace = JSON.parse(props.meetingPlace)
		const origin = {latitude: 40.7094191, longitude: -74.0084873}
		const googleMapsUrl = 
		`https://www.google.com/maps/dir/${origin.latitude},+${origin.longitude}/${meetingPlace.coordinates.latitude},${meetingPlace.coordinates.longitude}`	
		
		return (
			<Row>
				<Col xs={12}>
					<h3 className='alignCenter'>Let's meet at {meetingPlace.name}</h3>
					<h4><a href={googleMapsUrl}>Directions</a></h4>
				</Col>
				<Col xs={12}>
					<Map
						style='mapbox://styles/mapbox/streets-v9'
						center={{lat: meetingPlace.coordinates.latitude, lng: meetingPlace.coordinates.longitude}}
						containerStyle={{
							height: '50vh',
							width: '100%'
						}}
					>
					</Map>
					<Marker 
						coordinates={[10, 10]}
						anchor="bottom"
					>
						<img src='http://i.imgur.com/cqR6pUI.png'/>
					</Marker>
				</Col>
			</Row>
		)	
	} else {
		return (<p>Loading...</p>)
	}
}



/**
 * CONTAINER
 */
const mapState = state => {
	return {
		meetingPlace: state.currentTrip.yelpString
	}
}

export default connect(mapState)(TripDirections)

/**
 * PROP TYPES
 */
// TripDirections.propTypes = {
// 	friendArray: PropTypes.array
// }
