import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getYelpList} from './../store'

const YelpTest = (props) => {
	return (
		<div id="Yelp Test">
			<form id="yelpTestForm" onSubmit={props.handleSubmit}>
				<div className="">
					<span>
						<h5>x-Coordinate</h5>
					</span>
					<input
						className=""
						autoComplete= "off"
						type="text"
						defaultValue = "40.7061336"
						name="xCoord"
					/>
				</div>
				<div className="">
					<span>
						<h5>y-Coordinate</h5>
					</span>
					<input
						className=""
						autoComplete= "off"
						type="text"
						defaultValue="-74.0119549"
						name="yCoord"
					/>
				</div>
				<Button bsStyle="info" type="submit" className="submitButton">Test these Coords!</Button>
			</form>
		</div>
	)
}



/**
 * CONTAINER
 */
const mapState = () => {
	return {
		test: true
	}
}

function mapDispatchToProps (dispatch){
	return {
		handleSubmit: function(evt){
			evt.preventDefault()
			console.log([+evt.target.xCoord.value, evt.target.yCoord.value])
			dispatch(getYelpList([+evt.target.xCoord.value, +evt.target.yCoord.value]))
		}
	}
}

export default connect(mapState, mapDispatchToProps)(YelpTest)
