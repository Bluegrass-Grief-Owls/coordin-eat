import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button, FormGroup, Checkbox} from 'react-bootstrap'
import {updateFavs, setOneFav} from '../store'
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
			'New Mexican Cuisine', 'Nicaraguan', 'Noodles', 'Pakistani', 'Pan Asian', 'Persian/Iranian', 'Peruvian',
			'Pizza', 'Polish', 'Pop-Up Restaurants', 'Portuguese', 'Poutineries', 'Russian', 'Salad', 'Sandwiches', 
			'Scandinavian', 'Scottish', 'Seafood', 'Singaporean', 'Slovakian', 'Soul Food', 'Soup', 'Southern',
			'Spanish', 'Sri Lankan', 'Steakhouses', 'Supper Clubs', 'Sushi Bars', 'Syrian', 'Taiwanese', 'Tapas Bars',
			'Tapas/Small Plates', 'Tex-Mex', 'Thai', 'Turkish', 'Ukrainian', 'Uzbek', 'Vegan', 'Vegetarian', 
			'Vietnamese', 'Waffles', 'Wraps']
		const theUser = props.user
		return (
			<div>
				<Row>
					<Col xs={12}>
						<form onSubmit={(evt) => {props.handleSubmit(evt, props.user.favoriteFood, props.user.id)}}>
							<FormGroup className='noMargin'>
								<h3 className='fontAccentColor'>Select your favorite food!</h3>
								<Button className='tripButtonSmall displayBlock' type='submit'>Save Changes</Button>
								{
									foodArray.map(food => {
										return(
											<Checkbox id={food} checked={theUser.favoriteFood.includes(food)} className='fontAccentColor' onChange={(evt) =>{props.handleToggle(evt, theUser)}} key={food}><h4 className='displayInline'>{food}</h4></Checkbox>
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

const mapDispatch = (dispatch) => {
	return {
		handleToggle: function(evt, user) {
			let newFav = evt.target.id
			let favsArray = user.favoriteFood
			if (favsArray.includes(newFav)) {
				favsArray = favsArray.filter(food => food !== newFav)
			} else {
				favsArray.push(newFav)
			}
			dispatch(setOneFav(favsArray))
		},
		handleSubmit: function(evt, favsArray, userId) {
			evt.preventDefault()
			dispatch(updateFavs({favoriteFood: favsArray}, userId))
		}
	}
}

export default connect(mapState, mapDispatch)(TripDetails)

/**
 * PROP TYPES
 */
TripDetails.propTypes = {
	user: PropTypes.object
}
