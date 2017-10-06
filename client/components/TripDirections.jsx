import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import { Col, Row } from 'react-bootstrap'

class TripDirections extends React.Component {
	constructor(props) {
		super(props)
		this.meetingPlace = JSON.parse(props.meetingPlace)
	}

	componentWillReceiveProps(newProps) {
		this.meetingPlace = JSON.parse(newProps.meetingPlace)
		this.tooltipContainer = document.createElement('div')

		const me = newProps.currentTrip
			.attendees
			.find((attendee) => {
				return (attendee.userId === newProps.userId)
			})

		if (me) {
			this.currentLat = me.origin[0]
			this.currentLong = me.origin[1]
		}
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'
		console.log('coords:', this.meetingPlace.coordinates)
		this.map = new mapboxgl.Map({
			container: 'putMapHere',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [this.meetingPlace.coordinates.longitude, this.meetingPlace.coordinates.latitude],
			zoom: 18
		})
	}

	componentWillUnmount() {
		this.map.remove()
	}

	render() {
		const googleMapsUrl =
			`https://www.google.com/maps/dir/${this.currentLat},+${this.currentLong}/${this.meetingPlace.coordinates.latitude},${this.meetingPlace.coordinates.longitude}`

		return (
			<Row>
				<Col xs={12}>
					<h3 className='alignCenter'>Let's meet at {this.meetingPlace.name}</h3>
					<h4><a href={googleMapsUrl}>Directions</a></h4>
				</Col>
				<Col xs={12}>
					<div id='putMapHere' className='theMapBox'></div>
				</Col>
			</Row>
		)
	}
}



/**
 * CONTAINER
 */
const mapState = state => {
	return {
		meetingPlace: state.currentTrip.yelpString,
		currentTrip: state.currentTrip,
		userId: state.user.id
	}
}

export default connect(mapState)(TripDirections)

/**
 * PROP TYPES
 */
TripDirections.propTypes = {
	meetingPlace: PropTypes.string
}
