import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

/**
 * COMPONENT
 */
class InviteFriends extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.props.handleSubmit.bind(this)
	}

	render(){
		console.log("rendering")
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId='email'>
						<ControlLabel>Enter a friend's email</ControlLabel>
						<FormControl type='text' />
					</FormGroup>
				</form>
				<Button></Button>
			</div>
		)	
	}
}

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
		}
	}
}

export default connect(null, mapDispatch)(InviteFriends);
