
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FriendForm from './FriendForm.jsx'
import {postTrip, resetCurrentTrip, resetYelpList} from '../store'
import {FormGroup, FormControl, ControlLabel, Button, Checkbox, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import history from './../history'
import MobileDatePicker from 'react-mobile-datepicker'
import moment from 'moment'
import { Link } from 'react-router-dom'


let friendCounter = 0

class BuildTrip extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date(),
			friendCounter:0,
			//date as a string
			dateToGive: '',
			isDateOpen: false,
			validName: true
		}
		this.handleDateClick = this.handleDateClick.bind(this)
		this.handleDateCancel = this.handleDateCancel.bind(this)
		this.handleDateSelect = this.handleDateSelect.bind(this)
		this.handleTimeClick = this.handleTimeClick.bind(this)
		this.handleTimeCancel = this.handleTimeCancel.bind(this)
		this.handleTimeSelect = this.handleTimeSelect.bind(this)
		this.handleValidSubmit = this.handleValidSubmit.bind(this)
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

	handleValidSubmit = (evt) => {
		evt.preventDefault()
		if(!evt.target.tripName.value){
			this.setState({validName: false})
		} else {
			this.props.handleSubmit(evt, this.props.user.id, this.props.user.friend, this.state.time)
		}
	} 

	render() {
		let displayTime = this.state.time.toString()
		displayTime = displayTime.substring(0, displayTime.lastIndexOf(':'))

		friendCounter = 0
		let arrayOfFriends = []
		if(this.props.user.friend){
			arrayOfFriends = this.props.user.friend
		}
		let hasFriends = arrayOfFriends.length ? true : false
		if(this.props.user){
			return (
				<div>

					<h3 className='marginLeft15'>Pick a Date</h3>
					<h4 className='marginLeft15'>{displayTime}</h4>
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
					<form onSubmit={this.handleValidSubmit}>
						<FormGroup controlId="tripForm" id="tripForm">
							<ControlLabel>Trip Name</ControlLabel>
							<FormControl
								className = 'fontAccentColor authInput tripNameIn'
								type="text"
								name="tripName"
								placeholder="Enter trip name"
							/>


							{hasFriends ? <ControlLabel>Invite Your Friends!</ControlLabel>
								: <Link to='/friends' ><Button className='tripButtonSmall displayBlock'>+ Friends</Button></Link>}
	
							{
								arrayOfFriends.map(friend =>{
									friendCounter++
									return(
										<Checkbox id={'check'+friendCounter} className='fontMaintColorLight' key={friend.id}><h4 className='displayInline'>{friend.name}</h4></Checkbox>
									)
								})
							}
						</FormGroup>
						{
							this.state.validName ? <div /> : <h5 className='marginLeft15'>Trips must have a name.</h5> 
						}
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
