import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {updateTrip} from './../store'
import { Col, Row, Button } from 'react-bootstrap'

class TripDirections extends React.Component {
	constructor(props) {
		super(props)
		this.meetingPlace = JSON.parse(props.meetingPlace)
	}

	componentWillReceiveProps(newProps) {
		this.meetingPlace = JSON.parse(newProps.meetingPlace)
		console.log("MMMMMMMMMMMM", this.meetingPlace)
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
		this.map = new mapboxgl.Map({
			container: 'putMapHere',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [this.meetingPlace.coordinates.longitude, this.meetingPlace.coordinates.latitude],
			zoom: 12
		})

		function markerFactory(name, long, lat, img, map){
			let markerDomEl = document.createElement('div')
			markerDomEl.className = 'mapMarker'
			markerDomEl.name = name
			markerDomEl.style.backgroundImage = img

			new mapboxgl.Marker(markerDomEl)
				.setLngLat([long, lat + 0.001])
				.setPopup(new mapboxgl.Popup({ offset: 25 })
					.setHTML('<h5>' + markerDomEl.name + '</h5>'))
				.addTo(map)
			console.log(markerDomEl)
		}
		markerFactory(this.meetingPlace.name, this.meetingPlace.coordinates.longitude, this.meetingPlace.coordinates.latitude, 'url(../DestPin.png)', this.map)
		this.props.currentTrip.attendees.forEach(attendee =>{
			markerFactory(attendee.user.name, attendee.origin[1], attendee.origin[0], 'url(../Pin.png)', this.map)
		})
	}

	componentWillUnmount() {
		this.map.remove()
	}

	render() {

		console.log('qqqqqqqq',this.props)

		const googleMapsUrl =
			`https://www.google.com/maps/dir/${this.currentLat},+${this.currentLong}/${this.meetingPlace.coordinates.latitude},${this.meetingPlace.coordinates.longitude}`

		let isOwner = false
		if(this.props.userId === this.props.currentTrip.ownerId){
			isOwner = true
		}
		return (
			<Row>
				<Col xs={12}>
					<h3 className='alignCenter'>Let's meet at {this.meetingPlace.name}</h3>
					<h4 className='alignCenter'><a className='fontMainColorLight' href={googleMapsUrl}>Click <h4 className='fontAccentColor displayInline'>here</h4> for directions</a></h4>
				</Col>
				<Col xs={12}>
					<div id='putMapHere' className='theMapBox'></div>
				</Col>
				<Col xs={12}>
					{
						isOwner ? (<Button className='tripButton' onClick={() => {
							this.props.moveToFinished(this.props.currentTrip)}}>Conclude the Trip</Button>) : ''
					}
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

const mapDispatch = (dispatch) => {
	return {
		moveToFinished(trip){
			dispatch(updateTrip({status: 'finished'}, trip.id))
		}
	}
}

export default connect(mapState, mapDispatch)(TripDirections)

/**
 * PROP TYPES
 */
TripDirections.propTypes = {
	meetingPlace: PropTypes.string
}
