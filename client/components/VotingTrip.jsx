import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Accordion, Panel, Button} from 'react-bootstrap'
import {getYelpList, vote, getVote} from '../store'

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

	componentWillReceiveProps(){
		console.log('recieving props')
		this.props.fetchVote(this.props.user, this.props.currentTrip)						
	}

	render () {
		if(this.props.yelpList.length){
			return (
				<Row>
					<Col xs={1}></Col>
					<Col xs={10}>
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
											{(this.props.vote != idx) ?
												<Button
													bsStyle={this.props.vote ? 'warning' : 'primary'}
													className='destButton backgroundMainColor fontAccentColorLight'
													onClick={() => {this.props.handleDestination(idx, this.props.currentTrip.id)}}
												>
													{this.props.vote ? 'I changed my mind' : 'I Pick This One!'}
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
					<div className='marginLeft15'>There's nothing here!</div>
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
		user: state.user,
		currentTrip: state.currentTrip,
		vote: state.vote,
		yelpList: state.yelp,
		results: state.results
	}
}

const mapDispatch = (dispatch) => {
	return {
		getYelpData () {
			if(this.results.length){
				yelped = true
				console.log('Yelp search at',this.results[0].toFixed(6),',', this.results[1].toFixed(6) )
				dispatch(getYelpList([this.results[0].toFixed(6), this.results[1].toFixed(6)]))
			} else {
				dispatch(getYelpList(testCoords))
			}
		},
		handleDestination: (choice, trip) => {
			console.log('You chose ' + choice + '!')
			dispatch(vote(choice, trip))
		},
		fetchVote: (user, trip) => {
			dispatch(getVote(user, trip))
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
