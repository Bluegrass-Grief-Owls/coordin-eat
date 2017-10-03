import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import {getYelpList} from './../store'
import {ConfirmingTrip, VotingTrip, ResolvingTrip, FinishedTrip} from './index.js'

//Diferent statuses for a trip, not sure if we want to implement a past yet
let tripStatusArray = ['confirm', 'vote', 'resolved', 'past']
let currentStatus = 'confirm'

class SingleTrip extends Component {

	render () {
		if(currentStatus === 'confirm'){
			return (
				<ConfirmingTrip />
			)
		} else if (currentStatus === 'vote') {
			console.log('voting trip')
			return(
				<VotingTrip />
			)
		} else if (currentStatus === 'resolved') {
			return(
				<div>This should be the directions to the trip!</div>
			)
		} else if (currentStatus === 'past') {
			return(
				<div>This should be some info from a past trip</div>
			)
		} else {
			return (
				<div>
					<div className='marginLeft15'>This trip doesn't exist!</div>
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
		// TripBuild: state.TripBuild,
		yelpList: state.yelp,
		Results: state.Results
	}
}

export default connect(mapState)(SingleTrip)

/**
 * PROP TYPES
 */
SingleTrip.propTypes = {
	//TripBuild: PropTypes.array,
}