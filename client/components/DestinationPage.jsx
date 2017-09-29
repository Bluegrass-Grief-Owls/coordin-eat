import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Col, Row, Accordion, Panel, Button} from 'react-bootstrap'
import {getYelpList} from './../store'

let testCoords = [40.7061336, -74.0119549]
//Will use the trip build array, later....

class DestinationPage extends Component {
	componentWillMount () {
		// console.log('ahhhhhhhh')
		// console.log('========>', this.props.Results)
		// if(this.props.Results.length){
			this.props.getYelpData()
		// }
	}

	render () {
		console.log(this.props)
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
												<Col className='noPaddingRight' xs={6}>
													<img className='buissnessImage' src={buissness.image_url} alt= {buissness.name + ' image'} />
												</Col>
												<Col xs={6} className='noPaddingLeft'>
													<ul>
														<li>Tags: {tagList}</li>
														<li>Rating: {buissness.rating} | Price: {buissness.price}</li>
														<li>Phone: {buissness.display_phone}</li>
														<li>Link: <a href={buissness.url}>{buissness.name}</a></li>
														<li>Reviews: {buissness.review_count}</li>
													</ul>
												</Col>
											</Row>
											<Button className='destButton' bsStyle='success' onClick={() => {this.props.handleDestination(buissness.name)}}>I Pick This One!</Button>
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
					<div>There's nothing here!</div>
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
		TripBuild: state.TripBuild,
		yelpList: state.yelp,
		Results: state.Results
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		getYelpData () {
			if(ownProps.Results.length){
				dispatch(getYelpList([ownProps.Results[0], ownProps.Results[1]]))
			}
		},
		handleDestination: (choice) => {
			console.log('You chose ' + choice + '!')
			//dispatch(addFriend(friend))
		}
	}
}

export default connect(mapState, mapDispatch)(DestinationPage)

/**
 * PROP TYPES
 */
DestinationPage.propTypes = {
	TripBuild: PropTypes.array,
	yelpList: PropTypes.array
}
