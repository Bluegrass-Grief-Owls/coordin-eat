import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap'
import history from './../history'
import mapboxgl, { Marker } from 'mapbox-gl'


// const TripDetails = (props) => {

class TripDetails extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2xhc3MiLCJhIjoiY2o2ODNod2c3MGJqNDM0bDdpNm9xNWFxaSJ9.zt0UYvQhCl8Lx6zH9pZ7-w'
		this.map = new mapboxgl.Map({
			container: 'putMapHere',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [40.78, -72],
			zoom: 14
		})
	}

	componentWillUnmount() {
		this.map.remove()
	}


	render()  {

		if(this.props.user.id){
			const theUser = this.props.user
			let favString = ''
			let userHome = this.props.user.Home
			if (theUser.favoriteFood) {
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

						<Col xs={12} className='noPaddingRight noPaddingLeft'>
							<div id='putMapHere' className='theMapBox'>
							</div>
						</Col>

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
			return (
				<div>
					<h4> You are not logged in </h4>
					<Col xs={12} className='noPaddingRight noPaddingLeft'>
					<div id='putMapHere' className='theMapBox'>
					</div>
				</Col>
				</div>
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

export default connect(mapState)(TripDetails)

/**
 * PROP TYPES
 */
TripDetails.propTypes = {
	user: PropTypes.object
}
