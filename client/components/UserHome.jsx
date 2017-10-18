import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Button, Table, ListGroup, ListGroupItem } from 'react-bootstrap'
import { fetchMyTrips, resetCurrentTrip, resetYelpList } from './../store'
import { connect } from 'react-redux'
import history from './../history'

/**
 * COMPONENT
 */
export class UserHome extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		return (
			<Row className=''>
				<h3 className='noMargin welcomeUser'>Welcome, {this.props.user.name}!</h3>
				<Row>
					<Col xs={12} className='noPaddingLeft noPaddingRight'>
						<div className='myTripList'>
							{this.props.myTrips.length ?
								this.props.myTrips.map(attendance => {
									//This is actually a list of attendances attached with the trip they attended
									let theTrip = attendance.trip
									//TODO: if trip gets deleted need to specify that all associated attendences need to be deleted
									return (
										<div key={theTrip.id} className='noPaddingBottom myTripList' onClick={() => { history.push(`/trip/${theTrip.id}`) }}>
											<h3 className='marginLeft15 marginTop10 fontMainColor'>{theTrip.name} <h5 style={{float: 'right', padding: 10}}>Status: {theTrip.status} </h5></h3>
											<h5 className='marginLeft15 fontMainColor'>Date: {theTrip.readableDate}</h5>
											<h5 className='marginLeft15 fontMainColor'>Time: {theTrip.time}</h5>
										</div>
									)
								}) : <div key='noTrips' className='noPaddingBottom myTripList'>
									<h3 className='noMargin marginLeft15 fontMainColor'>You have no trips yet!</h3>
								</div>
							}
						</div>
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
		loadInitialData() {
			dispatch(resetCurrentTrip())
			dispatch(resetYelpList())
			dispatch(fetchMyTrips())
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
