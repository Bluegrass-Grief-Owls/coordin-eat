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
	componentWillMount(){
		yelped = false
	}

	componentDidMount() {
		if(!yelped){
			this.props.getYelpData()
		}
	}

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
			//Votes are -1 in the database
			if(attendance){
				myVote = attendance.vote
			}
			if(this.props.yelpList[0] !== null && myVote !== null){
				if(this.props.yelpList.length) {
					let hasFav = false
					return (
						<Row>
							<Col xs={1}></Col>
							<Col xs={10}>
								{
									isTripOwner ? (<Button className='tripButton' onClick={() => {
										this.props.moveToDirections(this.props.currentTrip, this.props.yelpList)}}>Procced to Directions</Button>) : ''
								}

								<h3 className='displayInlineBlock'>Choices</h3>
								{
									this.props.yelpList.forEach(yelp => {
										yelp.categories.forEach(cat =>{
											if(this.props.user.favoriteFood.includes(cat.title)){
												hasFav = true
											}
										})
									})
								}
								{	hasFav ? <h4 className='faveFoodKey displayInline marginLeft15'>(Favorite Foods)</h4> : <div />}
							</Col>
							<Col xs={1}></Col>
							<Col xs={12}>
								<Accordion>
									{
										this.props.yelpList.map((buissness, idx) => {
											let tagList = ''
											let faveFood = false
											for (var tag in buissness.categories){
												tagList += (', ' + buissness.categories[tag].title)
												if (this.props.user.favoriteFood.includes(buissness.categories[tag].title))
													faveFood = true
											}
											tagList = tagList.slice(2)
											return(
												<Panel className={faveFood ? 'faveFood' : ''} header={'\u25BC' + '   ' + buissness.name} key={idx} eventKey={buissness.id}>
													<Row>
														<Col className='noPaddingRight noPaddingLeft' xs={12} sm={6}>
															<img className='buissnessImage' src={buissness.image_url} alt= {buissness.name + ' image'} />
														</Col>
														<Col xs={12} sm={6} className='noPaddingLeft'>
															<ul className='text16px'>
																<li>Tags: {tagList}</li>
																<li>Rating: {buissness.rating} | Price: {buissness.price}</li>
																<li>Phone: {buissness.display_phone}</li>
																<li>Link: <a className='fontAccentColor' target='_blank' href={buissness.url}>{buissness.name}</a></li>
																<li>Reviews: {buissness.review_count}</li>
															</ul>
														</Col>
													</Row>
													{(myVote != idx) ?
														<Button
															bsStyle={myVote ? 'warning' : 'primary'}
															className='destButton backgroundMainColor fontAccentColorLight'
															onClick={() => {this.props.handleVote(idx, this.props.currentTrip, this.props.user.id, this.props.yelpList)}}
														>
															{myVote !== -1 ? 'I changed my mind' : 'I Pick This One!'}
														</Button>
														:
														<Button bsStyle="success" className='fontSize22' disabled>You voted for this</Button>
													}
												</Panel>
											)
										})
									}
								</Accordion>
							</Col>
						</Row>
					)
				} else {
					return (
						<div className='marginLeft15'>We couldn't find anything at this location!</div>
					)
				}

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
				dispatch(getYelpList([coords[0].toFixed(6), coords[1].toFixed(6)]))
			} else {
				yelped = true
				console.log('This is using the default coords [40.7061336, -74.0119549]')
				dispatch(getYelpList(testCoords))
			}
		},
		handleVote: (choice, trip, userId, yelpList) => {
			dispatch(postVote(choice, trip, userId, yelpList))
		},
		moveToDirections: (trip, yelpList) => {
			//Adding votes
			let voteCounter = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0,}
			trip.attendees.forEach(attendee => {
				if(attendee.vote !== -1){
					voteCounter[attendee.vote]++
				}
			})
			//Determine the most voted for
			let largest = []
			let number = voteCounter['0']
			for (var choice in voteCounter){
				if(voteCounter[choice] === number){
					largest.push(choice)
				} else if (voteCounter[choice] > number){
					number = voteCounter[choice]
					largest = [choice]
				}
			}
			//Select a random restaurant from the most voted and stringify it
			let randomChoice = +largest[Math.floor(Math.random() * largest.length)]
			let yelpChoice = JSON.stringify(yelpList[randomChoice])

			dispatch(updateTrip({status: 'directions', yelpString: yelpChoice}, trip.id))
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
