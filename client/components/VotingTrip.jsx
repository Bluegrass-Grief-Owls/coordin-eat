import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Accordion, Panel, Button} from 'react-bootstrap'
import {getYelpList, postVote, updateTrip} from '../store'

//Prevents multiple Yelp request from componentDidUpdate() loop
let yelped = false

let testCoords = [40.7061336, -74.0119549]
//Will use the trip build array, later....

class VotingTrip extends Component {
	componentDidMount() {
		if(!yelped){
			this.props.getYelpData()
		}
	}

	// componentWillReceiveProps(){
	// 	if(this.props.user.id && !gotVote){
	// 		gotVote = true
	// 		this.props.fetchVote(this.props.user, this.props.currentTrip)
	// 	}					
	// }

	render () {
		if(this.props.currentTrip.id){
			let isTripOwner = false
			if(this.props.currentTrip.ownerId === this.props.user.id){
				isTripOwner = true
			}
			let attendance = this.props.currentTrip.attendees.find(attendee => {
				return attendee.userId === this.props.user.id
			})
			let myVote = null
			if(attendance){
				myVote = attendance.vote
			}
			if(this.props.yelpList.length && myVote !== null){
				return (
					<Row>
						<Col xs={1}></Col>
						<Col xs={10}>
							{
								isTripOwner ? (<Button className='tripButton' onClick={() => {
									this.props.moveToDirections(this.props.currentTrip.id)}}>Procced to Directions</Button>) : ''
							}
							<h3>Choices</h3>
							<Accordion>
								{
									this.props.yelpList.map((buissness, idx) => {
										let tagList = ''
										for (var tag in buissness.categories){
											tagList += (', ' + buissness.categories[tag].title)
										}
										tagList = tagList.slice(2)
										return(
											<Panel header={buissness.name} key={idx} eventKey={buissness.id}>
												<Row>
													<Col className='noPaddingRight noPaddingLeft' xs={12} sm={6}>
														<img className='buissnessImage' src={buissness.image_url} alt= {buissness.name + ' image'} />
													</Col>
													<Col xs={12} sm={6} className='noPaddingLeft'>
														<ul>
															<li>Tags: {tagList}</li>
															<li>Rating: {buissness.rating} | Price: {buissness.price}</li>
															<li>Phone: {buissness.display_phone}</li>
															<li>Link: <a className='fontAccentColor' href={buissness.url}>{buissness.name}</a></li>
															<li>Reviews: {buissness.review_count}</li>
														</ul>
													</Col>
												</Row>
												{(myVote != idx) ?
													<Button
														bsStyle={myVote ? 'warning' : 'primary'}
														className='destButton backgroundMainColor fontAccentColorLight'
														onClick={() => {this.props.handleDestination(idx, this.props.currentTrip.id, this.props.user.id)}}
													>
														{myVote !== -1 ? 'I changed my mind' : 'I Pick This One!'}
													</Button>
													:
													<Button bsStyle="success" disabled>You voted for this</Button>
												}
											</Panel>
										)
									})
								}
							</Accordion>
						</Col>
						<Col xs={1}></Col>
					</Row>
				)
			} else {
				return (
					<div>
						<div className='marginLeft15'>Loading...</div>
					</div>
				)
			}
		}
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		user: state.user,
		currentTrip: state.currentTrip,
		yelpList: state.yelp
	}
}

const mapDispatch = (dispatch) => {
	return {
		getYelpData () {
			let coords = this.currentTrip.meetup
			if(coords.length){
				yelped = true
				console.log('Yelp search at', coords[0].toFixed(6), ',', coords[1].toFixed(6) )
				dispatch(getYelpList([coords[0].toFixed(6), coords[1].toFixed(6)]))
			} else {
				yelped = true
				console.log('This is using the default coords [40.7061336, -74.0119549]')
				dispatch(getYelpList(testCoords))
			}
		},
		handleDestination: (choice, trip, userId) => {
			dispatch(postVote(choice, trip, userId))
		},
		moveToDirections: (tripId) => {
			dispatch(updateTrip('directions', tripId))
		}
	}
}

export default connect(mapState, mapDispatch)(VotingTrip)

/**
 * PROP TYPES
 */
VotingTrip.propTypes = {
	// TripBuild: PropTypes.array,
	yelpList: PropTypes.array
}
