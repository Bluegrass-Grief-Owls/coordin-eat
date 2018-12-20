import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Accordion, Panel } from 'react-bootstrap'
import { fetchUsers, postFriend } from '../store'

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
			<Col xs={12}>
				<h3>Friends</h3>
				<Accordion>
					<Panel header="+ Add a Friend" key="add" eventKey="77" onSelect={handleSelect}>
						<Row>
							<Col xs={12} sm={6} className='noPaddingLeft'>
								<ul className="listPaddingLeft">
									{users.map(user => {
										return <li key={user.id} className='listMed'>
											{user.name}
											<Button 
												bsSize='small' 
												className='floatRight marginTop10 backgroundMainColor fontAccentColorLight'
												onClick={() => handleClick(user.id)}>
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
							<Panel header={'\u25BC' + '   ' + friend.name} key={index} eventKey={friend.id}>
							</Panel>
						)
					})}
				</Accordion>
			</Col>
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
		handleClick(friendId) {
			dispatch(postFriend(friendId))
		}
	}
}

export default connect(mapState, mapDispatch)(FriendsList)
