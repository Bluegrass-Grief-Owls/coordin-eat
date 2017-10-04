import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'
const POST_TRIP = 'POST_TRIP'
// const GET_FRIENDS = 'GET_FRIENDS'
// const ADD_FRIEND = 'ADD_FRIEND'
// const REMOVE_FRIEND = 'REMOVE_FRIEND'

/**
 * INITIAL STATE
 */
const currentTrip = {}

/**
 * ACTION CREATORS
 */

const fetchTripAction = (trip) => ({type: GET_TRIP, trip})
const postTripAction = () => ({type: POST_TRIP})
// export const getFriends = () => ({type: GET_FRIENDS})

// export const addFriend = friend => ({type: ADD_FRIEND, friend})

// export const removeFriend = friend => ({type: REMOVE_FRIEND, friend})

// //THUNKS
export function postTrip(trip, invitedIdArray){
	return function thunk (dispatch) {
		return axios.post('/api/trip', trip)
			.then(res => res.data)
			.then(newTrip => {
				newTrip.attendees = []
				invitedIdArray.forEach(userId => {
					axios.post('/api/attendee', {tripId: newTrip.id, userId})
						.then( () => {
							axios.post('/api/email/invite', {tripName: newTrip.name, invitee: userId})
						})
				})
				dispatch(postTripAction())
				history.push(`/trip/${newTrip.id}`)
			})
			.catch(console.error.bind(console))
	}
}

export function fetchTrip(tripId){
	return function thunk (dispatch) {
		return axios.get(`/api/trip/${tripId}`)
			.then(res => res.data)
			.then(trip => {
				dispatch(fetchTripAction(trip))
			})
	}
}

// export const calculate = (array) =>
// 	dispatch =>
// 		axios.post('/api/midpoint', {places: array})
// 			.then(res => console.log(res.data)

// 			)
// 			.catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = currentTrip, action) {
	switch (action.type) {
	case POST_TRIP:
		return state
	case GET_TRIP:
		return action.trip
	// case GET_FRIENDS:
	// 	return state
	// case ADD_FRIEND:
	// 	return [...state, action.friend]
	// case REMOVE_FRIEND:
	// 	return friendArray
	default:
		return state
	}
}
