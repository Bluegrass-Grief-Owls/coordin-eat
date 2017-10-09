import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'




export default class FriendForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (e) {
		this.setState({
			location: e.target.value
		})
	}

	handleSubmit (e) {
		e.preventDefault()
	}


	render() {
		return 	(<form onSubmit={this.handleSubmit}>
			Friend location: <input onChange={this.handleChange} type='text' name='friend-location'/>
			<input type='submit' value='submit' />
		</form>
		)
	}
}
