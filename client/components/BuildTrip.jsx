import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FriendForm from './FriendForm.jsx'
import {addFriend, calculate} from '../store'
import {Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import history from './../history'

//Lets find a date picker that does this
let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let dayArray = []
for(var i = 1; i <= 31; i++){
	dayArray.push(i)
}
let hourArray = []
for(var j = 1; j <= 12; j++){
	hourArray.push(j)
}
let minuiteArray = []
for(var k = 1; k <= 60; k++){
	minuiteArray.push(k)
}
let ampm = ['am', 'pm']
let dateChoice = ''

const BuildTrip = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<FormGroup controlId="tripForm">
				<ControlLabel>Trip Name</ControlLabel>
				<FormControl
					type="text"
					name="tripName"
					placeholder="Enter trip name"
				/>
				<ControlLabel>Month</ControlLabel>
				<FormControl componentClass="select" name="month">
					{
						monthArray.map((month, idx) => {
							return(
								<option key={idx} value={month}>{month}</option>
							)
						})
					}
				</FormControl>

				<ControlLabel>Day</ControlLabel>
				<FormControl componentClass="select" name="day">
					{
						dayArray.map((day, idx) => {
							return(
								<option key={idx} value={day}>{day}</option>
							)
						})
					}
				</FormControl>

				<ControlLabel>Hour</ControlLabel>
				<FormControl componentClass="select" name="hour">
					{
						hourArray.map((hour, idx) => {
							return(
								<option key={idx} value={hour}>{hour}</option>
							)
						})
					}
				</FormControl>

				<ControlLabel>Minute</ControlLabel>
				<FormControl componentClass="select" name="minute">
					{
						minuiteArray.map((minute, idx) => {
							return(
								<option key={idx} value={minute}>{minute}</option>
							)
						})
					}
				</FormControl>

				<ControlLabel>AM/PM</ControlLabel>
				<FormControl componentClass="select" name="ampm">
					{
						ampm.map((amorpm, idx) => {
							return(
								<option key={idx} value={amorpm}>{amorpm}</option>
							)
						})
					}
				</FormControl>
			</FormGroup>
			<Button className='tripButton displayBlock marginLeft15' type='submit' >Make my trip!</Button>
		</form>
	)
}

	



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		friendArray: state.TripBuild
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit: function(evt) {
			evt.preventDefault()
			console.log('Trip name:', evt.target.tripName.value, 'Date:', evt.target.month.value, evt.target.day.value, '2017 at', evt.target.hour.value + ':' + evt.target.minute.value, evt.target.ampm.value)
		},
		handleChange: function(date) {
			console.log(date)
		}
	}
}

export default connect(mapState, mapDispatch)(BuildTrip)

/**
 * PROP TYPES
 */
BuildTrip.propTypes = {
	// friendArray: PropTypes.array
}
