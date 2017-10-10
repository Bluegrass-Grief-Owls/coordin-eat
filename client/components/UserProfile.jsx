import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button, FormControl, FormGroup} from 'react-bootstrap'
import history from './../history'



const TripDetails = (props) => {

	if(props.user.id){
		const theUser = props.user
		let favString = ''
		let userHome = props.user.Home
		if (theUser.favoriteFood){
			theUser.favoriteFood.forEach(fav => {
				favString += (', ' + fav)
			})
			favString = favString.slice(2)
		} else {
			favString = 'Click "Edit Favorites" to add your favorite foods!'
		}


		return (
			<div>
				<Row>
					<Col xs={12}>
						<h3 className='fontAccentColor'>user# {theUser.id}: {theUser.name}</h3>
						<h4 className='fontMainColorLight'><b className='fontAccentColor'>Email:</b> {theUser.email}</h4>
						<h4 className='fontMainColorLight'><b className='fontAccentColor'>Favorites:</b> {favString}</h4>


						<h4 className='fontMainColorLight'><b className='fontAccentColor'>Home Location:</b> {userHome}</h4>



						<Button className='tripButtonSmall' onClick={() => {
							history.push('/editFavorites')
						}}>Edit Favorites</Button>
					</Col>
				</Row>
			</div>
		)
	} else {
		return(
			<div>
				<h4 className='marginLeft15'>You aren't logged in!</h4>
			</div>
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

export default connect(mapState)(TripDetails)

/**
 * PROP TYPES
 */
TripDetails.propTypes = {
	user: PropTypes.object
}
