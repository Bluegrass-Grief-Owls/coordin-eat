import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import { withRouter } from 'react-router';
import {Col, Row, Button, Table} from 'react-bootstrap'
import {getYelpList, fetchTrip} from './../store'
import {ConfirmingTrip, VotingTrip, TripDirections, FinishedTrip, TripDetails} from './index.js'

// Trip statuses for reference 'confirming', 'voting', 'directions', 'finished'

class SingleTrip extends Component {

	componentDidMount () {
		this.props.loadInitialData(+this.props.match.params.tripId)
	}

	render () {
		if(this.props.currentTrip.id){
			let theTrip = this.props.currentTrip
			let currentStatus = theTrip.status
			switch (currentStatus) {
			case 'confirming':
				return (
					<div>
						<TripDetails />
						<ConfirmingTrip />
					</div>
				)
			case 'voting':
				return(
					<div>
						<TripDetails />
						<VotingTrip />
					</div>
				)
			case 'directions':
				return(
					<div>
						<TripDetails />
						<TripDirections />
					</div>
				)
			case 'finished':
				return(
					<div>
						<FinishedTrip />
					</div>
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

export default withRouter(connect(mapState, mapDispatch)(SingleTrip))

/**
 * PROP TYPES
 */
SingleTrip.propTypes = {
	//TripBuild: PropTypes.array,
}
