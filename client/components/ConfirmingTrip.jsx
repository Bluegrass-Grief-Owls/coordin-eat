import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import axios from 'axios'




let attendeeArray = [{name: 'Jackson', location: [40.7061336, -74.0119549]}, {name: 'David'}, {name: 'Sam', location: [40.7061336, -74.0119549]}]
let isTripOwner = true

class ConfirmTrip extends Component {
	constructor(props) {
		super(props)
		this.state = {
			confirmed: false,
			location: [4]
		}
		this.getLocation = this.getLocation.bind(this)
		this.removeFromTrip = this.removeFromTrip.bind(this)
	}



	getLocation () {

		console.log('old state location', this.state.location)

		const promiseForLocation = new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject)
		})

		promiseForLocation
			.then(function(position) {
				this.setState(function() {
					return {location: [position.coords.longitude, position.coords.latitude]}
				}, function () {
					console.log('new state location',this.state.location)
				})
			}.bind(this))
			.catch(console.error.bind(console))


	}


	manualEnter () {

	}


	removeFromTrip () {
		axios.delete(`/api/attendee/${this.props.currentTrip.id}/${this.props.user.id}`)
			.then(() => console.log(`${this.props.currentTrip.id} ${this.props.user.id}`))
	}



	render () {

		console.log('props from confirming', this.props)
		return (
			<div>
				<h1>Da trip</h1>
				<button onClick={this.getLocation}>Get my location</button>
				<form>
					This is what my geographical coordinates are  going to be:
					<input type='text' name='address'/>
				</form>

				<button onClick={this.removeFromTrip}>Can't make it</button>
			</div>

		)
	}
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


export default connect(mapState)(ConfirmTrip)
