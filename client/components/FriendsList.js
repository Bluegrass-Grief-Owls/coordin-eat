import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col, Row, Accordion, Panel } from 'react-bootstrap'
import { fetchUsers, postFriend, me } from '../store'

/**
 * COMPONENT
 */
const FriendsList = (props) => {
	const friends = props.friends || []
	const friendsIds = friends.map(friend => friend.id)
	const users = props.users.filter(user => {
		return user.id !== props.user.id && !friendsIds.includes(user.id)
	}) || []
	const {handleSelect, handleClick} = props
	const meId = props.user.id
	return (
		<Row>
			<Col xs={1}></Col>
			<Col xs={10}>
				<h3>Friends</h3>
				<Accordion>
					<Panel header="+ Add a Friend" key="add" eventKey="77" onSelect={handleSelect}>
						<Row>
							<Col xs={12} sm={6} className='noPaddingLeft'>
								<ul>
									{users.map(user => {
										return <li key={user.id} className='listMed'>
											{user.name}
											<br />
											{user.email}
											<Button 
												bsSize='small' 
												className='floatRight backgroundMainColor fontAccentColorLight'
												onClick={() => handleClick(meId, user.id)}>
												+
											</Button>
										</li>
									})
									}
								</ul>
							</Col>
						</Row>
					</Panel>
					{friends.map((friend, index) => {
						return (
							<Panel header={friend.name} key={index} eventKey={friend.id}>
								<Row>
									<Col xs={12} sm={6} className='noPaddingLeft'>
										<ul>
											<li>Email: {friend.email}</li>
										</ul>
									</Col>
								</Row>
							</Panel>
						)
					})}
				</Accordion>
			</Col>
			<Col xs={1}></Col>
		</Row>
	)	
}

const mapState = state => {
	return {
		user: state.user,
		friends: state.user.friend,
		users: state.users
	}
}

const mapDispatch = dispatch => {
	return {
		handleSelect() {
			dispatch(fetchUsers())
		},
		handleClick(myId, friendId) {
			// console.log(id)
			dispatch(postFriend(myId, friendId))
		}
	}
}

export default connect(mapState, mapDispatch)(FriendsList)
