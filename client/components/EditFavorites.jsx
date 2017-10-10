import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap'
import history from './../history'


const TripDetails = (props) => {

	if(props.user.id){
		const foodArray = ['Afghan', 'African', 'American', 'Arabian', 'Argentine', 'Armenian', 'Asian Fusion',
			'Australian', 'Austrian', 'Bangladeshi', 'Barbeque', 'Basque', 'Belgian', 'Brasseries', 'Brazilian',
			'Breakfast & Brunch', 'British', 'Buffets', 'Burgers', 'Burmese', 'Cafes', 'Cafeteria', 'Cajun/Creole',
			'Cambodian', 'Caribbean', 'Catalan', 'Cheesesteaks', 'Chicken Shop', 'Chicken Wings', 'Chinese', 
			'Comfort Food', 'Creperies', 'Cuban', 'Czech', 'Delis', 'Diners', 'Dinner Theater', 'Ethiopian',
			'Fast Food', 'Filipino', 'Fish & Chips', 'Fondue', 'Food Court', 'Food Stands', 'French', 'Game Meat',
			'Gastropubs', 'German', 'Gluten-Free', 'Greek', 'Guamanian', 'Halal', 'Hawaiian', 'Himalayan/Nepalese',
			'Honduran', 'Hong Kong Style Cafe', 'Hot Dogs', 'Hot Pot', 'Hungarian', 'Iberian', 'Indian', 'Indonesian',
			'Irish', 'Italian', 'Japanese', 'Kebab', 'Korean', 'Kosher', 'Laotian', 'Latin American', 'Live/Raw Food',
			'Malaysian', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Modern European', 'Mongolian', 'Moroccan', 
			'New Mexican Cuisine' ]
		const theUser = props.user
		return (
			<div>
				<Row>
					<Col xs={12}>
						<form>
							<FormGroup className='noMargin'>
								<h3 className='fontAccentColor'>Select your favorite food!</h3>
								{
									foodArray.map(food => {
										return(
											<Checkbox id={food} className='fontAccentColor' key={food}><h4 className='displayInline'>{food}</h4></Checkbox>
										)
									})
								}
							</FormGroup>
						</form>
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
