import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'
const REMOVE_FRIEND = 'REMOVE_FRIEND'

/**
 * INITIAL STATE
 */
const friendArray = [[23,45]]

/**
 * ACTION CREATORS
 */
const getFriends = () => ({type: GET_FRIENDS})
const addFriend = friend => ({type: ADD_FRIEND, friend})
const removeFriend = friend => ({type: REMOVE_FRIEND, friend})



/**
 * REDUCER
 */
export default function (state = friendArray, action) {
	switch (action.type) {
	case GET_FRIENDS:
		return state
	case ADD_FRIEND:
		return action.friend
	case REMOVE_FRIEND:
		return friendArray
	default:
		return state
	}
}
