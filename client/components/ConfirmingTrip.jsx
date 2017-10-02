import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Button, Table} from 'react-bootstrap'


let attendeeArray = [{name: 'Jackson', location: [40.7061336, -74.0119549]}, {name: 'David'}, {name: 'Sam', location: [40.7061336, -74.0119549]}]
let isTripOwner = true

class SingleTrip extends Component {

	render () {
		return (
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<h3>Here's Who's Coming!</h3>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>location</th>
							</tr>
						</thead>
						<tbody>
							{
								attendeeArray.map((attendee, idx) =>{
									return (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{attendee.name}</td>
											{attendee.location ? (<td>{attendee.location[0]+ ', '+attendee.location[1]}</td>) : (<td>Awaiting Reply</td>)}
										</tr>
									)
								})
							}
						</tbody>
					</Table>
					{
						isTripOwner ? (<Button className='tripButton'>Procced to Voting</Button>) : ''
					}
				</Col>
				<Col xs={1}></Col>
			</Row>
		)
	}
}


/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		TripBuild: state.TripBuild,
		yelpList: state.yelp,
		Results: state.Results
	}
}

const mapDispatch = (dispatch) => {
	return {
	}
}

export default connect(mapState, mapDispatch)(SingleTrip)

/**
 * PROP TYPES
 */
SingleTrip.propTypes = {
	//TripBuild: PropTypes.array,
}