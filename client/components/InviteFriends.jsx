import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { addFriend } from '../store'

/**
 * COMPONENT
 */
const InviteFriends = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<FormGroup controlId='email'>
					<ControlLabel>Enter a friend's email</ControlLabel>
					<FormControl type='text' />
				</FormGroup>
				<Button type="submit">Invite</Button>
			</form>
		</div>
	)	
}

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			dispatch(addFriend({email: evt.target.email.value, location: null}))
			evt.target.email.value = ''
		}
	}
}

export default connect(null, mapDispatch)(InviteFriends);
