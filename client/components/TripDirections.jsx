import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import {Col, Row, Button} from 'react-bootstrap'
import history from './../history'

export const TripDirections = (props) => {
	const Map = ReactMapboxGl({accessToken:'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'})
	const meetingPlace = 
	{
		'id': 'white-horse-tavern-financial-district-new-york',
		'name': 'White Horse Tavern - Financial District',
		'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/b69tEoj0acw-Kv79lyw8wA/o.jpg',
		'url': 'https://www.yelp.com/biz/white-horse-tavern-financial-district-new-york?adjust_creative=e_FstxasgKCE2PKFS4guZQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=e_FstxasgKCE2PKFS4guZQ',
		'review_count': 228,
		'categories': [
			{
				'alias': 'pubs',
				'title': 'Pubs'
			},
			{
				'alias': 'burgers',
				'title': 'Burgers'
			},
			{
				'alias': 'venues',
				'title': 'Venues & Event Spaces'
			}
		],
		'rating': 4,
		'coordinates': {
			'latitude': 40.703723,
			'longitude': -74.012374
		},
		'transactions': [],
		'price': '$',
		'location': {
			'address1': '25 Bridge St',
			'address2': '',
			'address3': '',
			'city': 'New York',
			'zip_code': '10004',
			'country': 'US',
			'state': 'NY',
			'display_address': [
				'25 Bridge St',
				'New York, NY 10004'
			]
		},
		'phone': '+12126689046',
		'display_phone': '(212) 668-9046',
		'distance': 265.345237528376
	}

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
				{/* <Marker 
					coordinates={[meetingPlace.coordinates.latitude, meetingPlace.coordinates.longitude]}
					anchor="bottom"
				>
					<img src='http://i.imgur.com/cqR6pUI.png'/>
				</Marker> */}
			</Col>
		</Row>
	)
}



/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(TripDirections)

/**
 * PROP TYPES
 */
// TripDirections.propTypes = {
// 	friendArray: PropTypes.array
// }
