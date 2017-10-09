import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Col, Row, Button, Table, ListGroup, ListGroupItem} from 'react-bootstrap'
import {fetchMyTrips, resetCurrentTrip, resetYelpList} from './../store'
import {connect} from 'react-redux'
import history from './../history'

/**
 * COMPONENT
 */
class UserHome extends Component {

	componentDidMount () {
		this.props.loadInitialData(+this.props.user.id)
	}

	componentDidUpdate(newProps) {
		if(!newProps.myTrips[0]){
			this.props.loadTrips(+this.props.user.id)
		}
	}

	render () {
		return (
			<Row className=''>
				<h3 className='noMargin welcomeUser'>Welcome, {this.props.user.name}!</h3>
				<Row>
					<Col xs={1}>
					</Col>
					<Col xs={10}>
						<ListGroup className='myTripList'>
							{ this.props.myTrips.length ?
								this.props.myTrips.map(attendance => {
									//This is actually a list of attendances attached with the trip they attended
									let theTrip = attendance.trip
									//TODO: if trip gets deleted need to specify that all associated attendences need to be deleted
									return(
										<ListGroupItem key={theTrip.id} className='noPaddingBottom myTripList' onClick={() => {history.push(`/trip/${theTrip.id}`)}}>
											<h3 className='noMargin fontMainColor'>{theTrip.name}</h3>
											<h5 className='fontMainColor'>Date: {theTrip.readableDate}</h5>
											<h5 className='fontMainColor'>Time: {theTrip.time}</h5>
										</ListGroupItem>
									)
								}) : <ListGroupItem key='noTrips' className='noPaddingBottom myTripList'>
									<h3 className='noMargin fontMainColor'>You have no trips yet!</h3>
								</ListGroupItem>
							}
						</ListGroup>
					</Col>
					<Col xs={1}>
					</Col>
				</Row>
			</Row>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user,
		myTrips: state.myTrips
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData (userId) {
			dispatch(resetCurrentTrip())
			dispatch(resetYelpList())
			if(userId){
				dispatch(fetchMyTrips(userId))
			}
		},
		loadTrips (userId) {
			if(userId){
				dispatch(fetchMyTrips(userId))
			}
		}
	}
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	user: PropTypes.object,
	myTrips: PropTypes.array
}
