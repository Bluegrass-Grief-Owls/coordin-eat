import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

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
			</form>
			<Button>Invite</Button>
		</div>
	)	
}

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
		}
	}
}

export default connect(null, mapDispatch)(InviteFriends);
