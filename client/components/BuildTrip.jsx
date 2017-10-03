import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FriendForm from './FriendForm.jsx'
import {postTrip} from '../store'
import {Col, FormGroup, FormControl, ControlLabel, Button, Checkbox} from 'react-bootstrap'
import history from './../history'

//Lets find a date picker that does this
let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let monthValArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
let dayArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
for(var i = 11; i <= 31; i++){
	dayArray.push(i)
}
let hourArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
let minuiteArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
for(var k = 11; k <= 60; k++){
	minuiteArray.push(k)
}
let ampm = ['am', 'pm']
let friendCounter = 0

const BuildTrip = (props) => {
	friendCounter = 0
	if(props.user.friend){
		return (
			<form onSubmit={(evt) => {props.handleSubmit(evt, props.user.id, props.user.friend)}}>
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
									<option key={idx} value={monthValArray[idx]}>{month}</option>
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
					<ControlLabel>Invite Your Friends!</ControlLabel>
					{
						props.user.friend.map(friend =>{
							friendCounter++
							return(
								<Checkbox id={'check'+friendCounter} key={friend.id}>{friend.name}</Checkbox>
							)
						})
					}
				</FormGroup>
				<Button className='tripButton displayBlock marginLeft15' type='submit' >Make my trip!</Button>
			</form>
		)
	} else {
		return(
			<div>Loading...</div>
		)
	}
}

	



/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit: function(evt, ownerId, friends) {
			evt.preventDefault()
			let hour = evt.target.hour.value
			if (evt.target.ampm.value === 'pm'){
				hour = Number(hour) + 12
			}
			if (hour === 24){
				hour = '00'
			}
			let theDate = ('2017-' + evt.target.month.value+'-'+evt.target.day.value +' '+ hour + ':' + evt.target.minute.value+':00')
			let invitedIdArray = [+ownerId]
			for(var i = 1; i <= friendCounter; i++){
				let name = 'check' + i
				console.log(name)
				let target = document.getElementById(name)
				if(target.checked){
					invitedIdArray.push(friends[i - 1].id)
				}
			}
			dispatch(postTrip({name: evt.target.tripName.value, date: theDate, ownerId}, invitedIdArray))
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
