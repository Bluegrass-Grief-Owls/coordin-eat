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
const updateTripStatus = (updatedTrip) => ({type: UPDATE_STATUS, updatedTrip})

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
				let obj = {choiceIdx, userId}
				dispatch(voteAction(obj))
				//This route returns the trip, which lets us check to see if voting is done
				let votingDone = theTrip.data.attendees.every(attendee => {
					return attendee.vote !== -1
				})
				if(votingDone){
					dispatch(updateTrip('directions', tripId))
				}
			})
	}
}

export function updateTrip(status, tripId){
	return function thunk (dispatch) {
		return axios.put(`/api/trip/${tripId}`, {status})
			.then(tripData => {
				dispatch(updateTripStatus(tripData.data))
				history.push(`/trip/${tripId}`)
			})
	}
}


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
	case UPDATE_STATUS:
		return action.updatedTrip
	default:
		return state
	}
}
