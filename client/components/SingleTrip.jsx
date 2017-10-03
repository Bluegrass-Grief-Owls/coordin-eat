import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'
import {getYelpList, fetchTrip} from './../store'
import {ConfirmingTrip, ResolvingTrip, FinishedTrip} from './index.js'

// Trip statuses for reference 'confirming', 'voting', 'directions', 'finished'

class SingleTrip extends Component {

	componentDidMount () {
		this.props.loadInitialData(+this.props.match.params.tripId)
	}

	render () {
		if(this.props.currentTrip.id){
			let theTrip = this.props.currentTrip
			let currentStatus = theTrip.status
			if(currentStatus === 'confirming'){
				return (
					<ConfirmingTrip />
				)
			} else if (currentStatus === 'voting') {
				return(
					<div>This should be the yelp page view</div>
				)
			} else if (currentStatus === 'directions') {
				return(
					<div>This should be the directions to the trip!</div>
				)
			} else if (currentStatus === 'finished') {
				return(
					<div>This should be some info from a past trip</div>
				)
			} 
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
		currentTrip: state.currentTrip
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData (tripId) {
			dispatch(fetchTrip(tripId))
		}
	}
}

export default connect(mapState, mapDispatch)(SingleTrip)

/**
 * PROP TYPES
 */
SingleTrip.propTypes = {
	//TripBuild: PropTypes.array,
}