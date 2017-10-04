import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'
const POST_TRIP = 'POST_TRIP'
const VOTED = 'VOTED'
const GET_VOTE = 'GET_VOTE'
const UPDATE_STATUS = 'UPDATE_STATUS'

/**
 * INITIAL STATE
 */
const currentTrip = {}

/**
 * ACTION CREATORS
 */

const fetchTripAction = (trip) => ({type: GET_TRIP, trip})
const postTripAction = () => ({type: POST_TRIP})
const voteAction = (choiceObj) => ({type: VOTED, choiceObj})
const getVoteAction = (vote) => ({type: GET_VOTE, vote})
const updateTripStatus = (newStatus) => ({type: UPDATE_STATUS, newStatus})

// //THUNKS

export function postTrip(trip, invitedIdArray){
	return function thunk (dispatch) {
		return axios.post('/api/trip', trip)
			.then(res => res.data)
			.then(newTrip => {
				newTrip.attendees = []
				invitedIdArray.forEach(userId => {
					axios.post('/api/attendee', {tripId: newTrip.id, userId})
				})
				dispatch(postTripAction())
				history.push(`/trip/${newTrip.id}`)
			})
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

export function postVote(choiceIdx, tripId, userId){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + tripId, {vote: choiceIdx})
			.then((theTrip) => {
				//This route returns the trip, which lets us check to see if voting is done
				let votingDone = theTrip.data.attendees.every(attendee => {
					return attendee.vote !== -1
				})
				console.log('is voting done?',votingDone)
				let obj = {choiceIdx, userId}
				dispatch(voteAction(obj))
			})
	}
}

// export function getVote(user, trip){
// 	console.log('trying to get vote!')
// 	return function thunk (dispatch) {
// 		trip.attendees.forEach((attendee) =>{
// 			if(attendee.userId === user.id){
// 				const action = getVoteAction(attendee.vote)
// 				dispatch(action)
// 			}
// 		})
// 	}
// }

/**
 * REDUCER
 */
export default function (state = currentTrip, action) {
	switch (action.type) {
	case POST_TRIP:
		return state
	case GET_TRIP:
		return action.trip
	case VOTED:
		return Object.assign({}, state, { attendees: state.attendees.map(attendee => {
			if(attendee.userId === action.choiceObj.userId){
				let tempObj = attendee
				tempObj.vote = action.choiceObj.choiceIdx
				return tempObj
			} else {
				return attendee
			}
		})})
	// case GET_VOTE:
	// 	return action.vote
	default:
		return state
	}
}
