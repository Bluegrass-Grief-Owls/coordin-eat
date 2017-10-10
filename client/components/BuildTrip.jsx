
import React, { Component } from 'react'
import DatePicker from 'react-mobile-datepicker'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FriendForm from './FriendForm.jsx'
import {postTrip, resetCurrentTrip, resetYelpList} from '../store'
import {Col, FormGroup, FormControl, ControlLabel, Button, Checkbox, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import history from './../history'
import MobileDatePicker from 'react-mobile-datepicker'
import moment from 'moment'


let friendCounter = 0

class BuildTrip extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date(),
			friendCounter:0,
			//date as a string
			dateToGive: '',
			isDateOpen: false
		}
		this.handleDateClick = this.handleDateClick.bind(this)
		this.handleDateCancel = this.handleDateCancel.bind(this)
		this.handleDateSelect = this.handleDateSelect.bind(this)
		this.handleTimeClick = this.handleTimeClick.bind(this)
		this.handleTimeCancel = this.handleTimeCancel.bind(this)
		this.handleTimeSelect = this.handleTimeSelect.bind(this)
	}

	handleDateClick = () => {
		this.setState({ isDateOpen: true });
	}

	handleDateCancel = () => {
		this.setState({ isDateOpen: false });
	}

	handleDateSelect = (time) => {
		this.setState({ time, isDateOpen: false });
	}

	handleTimeClick = () => {
		this.setState({ isTimeOpen: true });
	}

	handleTimeCancel = () => {
		this.setState({ isTimeOpen: false });
	}

	handleTimeSelect = (time) => {
		this.setState({ time, isTimeOpen: false });
	}

	render() {
		friendCounter = 0
		if(this.props.user.friend){
			return (
				<div>

					<h3 className='marginLeft15'>Pick a Date</h3>
					<h4 className='marginLeft15'>{this.state.time.toString().slice(0,-15)}</h4>
					<div className="marginLeft15">
						<ButtonToolbar>
					      <ButtonGroup>
					        <Button
								className="select-btn tripButton"
								onClick={this.handleDateClick}>
								Set Date
							</Button>
							<Button
								className="select-btn tripButton"
								onClick={this.handleTimeClick}>
								Set Time
							</Button>
					      </ButtonGroup>
					    </ButtonToolbar>

						<MobileDatePicker
							value={this.state.time}
							isOpen={this.state.isDateOpen}
							onSelect={this.handleDateSelect}
							onCancel={this.handleDateCancel} 
							theme="ios"
							confirmText="Confirm"
							cancelText="Cancel"
							dateFormat={['M', 'D', 'YYYY']}
						/>
						<MobileDatePicker
							value={this.state.time}
							isOpen={this.state.isTimeOpen}
							onSelect={this.handleTimeSelect}
							onCancel={this.handleTimeCancel} 
							theme="ios"
							confirmText="Confirm"
							cancelText="Cancel"
							dateFormat={['hh', 'mm']}
						/>
					</div>

					{//needto give this sythetic event onsubmit access to state props
					}
					<form onSubmit={(evt) => {this.props.handleSubmit(evt, this.props.user.id,
						this.props.user.friend, this.state.time)}}>
						<FormGroup controlId="tripForm" id="tripForm">
							<ControlLabel>Trip Name</ControlLabel>
							<FormControl
								className = 'fontAccentColor authInput tripNameIn'
								type="text"
								name="tripName"
								placeholder="Enter trip name"
							/>



							<ControlLabel>Invite Your Friends!</ControlLabel>
							{
								this.props.user.friend.map(friend =>{
									friendCounter++
									return(
										<Checkbox id={'check'+friendCounter} className='fontMaintColorLight' key={friend.id}><h4 className='displayInline'>{friend.name}</h4></Checkbox>
									)
								})
							}
						</FormGroup>

						<Button className='tripButton displayBlock marginLeft15' type='submit' >Make my trip!</Button>
					</form>

				</div>
			)
		} else {
			return(
				<div>Loading...</div>
			)
		}
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
		handleSubmit: function(evt, ownerId, friends, theEventTime) {
			evt.preventDefault()
			//reset the current trip state
			dispatch(resetCurrentTrip())
			dispatch(resetYelpList())

			let theDate = theEventTime
			let invitedIdArray = [+ownerId]
			for(var i = 1; i <= friendCounter; i++){
				let name = 'check' + i
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


































// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import FriendForm from './FriendForm.jsx'
// import {postTrip, resetCurrentTrip, resetYelpList} from '../store'
// import {Col, FormGroup, FormControl, ControlLabel, Button, Checkbox} from 'react-bootstrap'
// import history from './../history'
// import DatePicker from 'react-datepicker'
// import moment from 'moment'

// //Lets find a date picker that does this
// let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// let monthValArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
// let dayArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
// for(var i = 11; i <= 31; i++){
// 	dayArray.push(i)
// }
// let hourArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
// let minuiteArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
// for(var k = 11; k <= 60; k++){
// 	minuiteArray.push(k)
// }
// let ampm = ['am', 'pm']
// let friendCounter = 0

// const BuildTrip = (props) => {
// 	friendCounter = 0
// 	if(props.user.friend){
// 		return (
// 			<DatePicker/>

// 			<form onSubmit={(evt) => {props.handleSubmit(evt, props.user.id, props.user.friend)}}>
// 				<FormGroup controlId="tripForm">
// 					<ControlLabel>Trip Name</ControlLabel>
// 					<FormControl
// 						type="text"
// 						name="tripName"
// 						placeholder="Enter trip name"
// 					/>
// 					<ControlLabel>Month</ControlLabel>
// 					<FormControl componentClass="select" name="month">
// 						{
// 							monthArray.map((month, idx) => {
// 								return(
// 									<option key={idx} value={monthValArray[idx]}>{month}</option>
// 								)
// 							})
// 						}
// 					</FormControl>

// 					<ControlLabel>Day</ControlLabel>
// 					<FormControl componentClass="select" name="day">
// 						{
// 							dayArray.map((day, idx) => {
// 								return(
// 									<option key={idx} value={day}>{day}</option>
// 								)
// 							})
// 						}
// 					</FormControl>

// 					<ControlLabel>Hour</ControlLabel>
// 					<FormControl componentClass="select" name="hour">
// 						{
// 							hourArray.map((hour, idx) => {
// 								return(
// 									<option key={idx} value={hour}>{hour}</option>
// 								)
// 							})
// 						}
// 					</FormControl>

// 					<ControlLabel>Minute</ControlLabel>
// 					<FormControl componentClass="select" name="minute">
// 						{
// 							minuiteArray.map((minute, idx) => {
// 								return(
// 									<option key={idx} value={minute}>{minute}</option>
// 								)
// 							})
// 						}
// 					</FormControl>

// 					<ControlLabel>AM/PM</ControlLabel>
// 					<FormControl componentClass="select" name="ampm">
// 						{
// 							ampm.map((amorpm, idx) => {
// 								return(
// 									<option key={idx} value={amorpm}>{amorpm}</option>
// 								)
// 							})
// 						}
// 					</FormControl>
// 					<ControlLabel>Invite Your Friends!</ControlLabel>
// 					{
// 						props.user.friend.map(friend =>{
// 							friendCounter++
// 							return(
// 								<Checkbox id={'check'+friendCounter} key={friend.id}>{friend.name}</Checkbox>
// 							)
// 						})
// 					}
// 				</FormGroup>
// 				<Button className='tripButton displayBlock marginLeft15' type='submit' >Make my trip!</Button>
// 			</form>
// 		)
// 	} else {
// 		return(
// 			<div>Loading...</div>
// 		)
// 	}
// }





// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
// 	return {
// 		user: state.user
// 	}
// }

// const mapDispatch = (dispatch) => {
// 	return {
// 		handleSubmit: function(evt, ownerId, friends) {
// 			evt.preventDefault()
// 			//reset the current trip state
// 			dispatch(resetCurrentTrip())
// 			dispatch(resetYelpList())
// 			let hour = evt.target.hour.value
// 			if (evt.target.ampm.value === 'pm'){
// 				hour = Number(hour) + 12
// 			}
// 			if (hour === 24){
// 				hour = '00'
// 			}
// 			let theDate = ('2017-' + evt.target.month.value+'-'+evt.target.day.value +' '+ hour + ':' + evt.target.minute.value+':00')
// 			let invitedIdArray = [+ownerId]
// 			for(var i = 1; i <= friendCounter; i++){
// 				let name = 'check' + i
// 				console.log(name)
// 				let target = document.getElementById(name)
// 				if(target.checked){
// 					invitedIdArray.push(friends[i - 1].id)
// 				}
// 			}
// 			dispatch(postTrip({name: evt.target.tripName.value, date: theDate, ownerId}, invitedIdArray))
// 		}
// 	}
// }

// export default connect(mapState, mapDispatch)(BuildTrip)

// /**
//  * PROP TYPES
//  */
// BuildTrip.propTypes = {
// 	// friendArray: PropTypes.array
// }



