import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'
const POST_TRIP = 'POST_TRIP'
const DECLINE_INVITATION = 'DECLINE_INVITATION'
const SET_COORDINATES = 'SET_COORDINATES'

/**
 * INITIAL STATE
 */
const currentTrip = {}
//SAM: the area I'm looking for: currentTrip.attendees (array of objects)

/**
 * ACTION CREATORS
 */

const fetchTripAction = (trip) => ({type: GET_TRIP, trip})
const postTripAction = () => ({type: POST_TRIP})
const declineInvitationAction = () => ({type: DECLINE_INVITATION})
const setCoordinatesAction = () => ({type:SET_COORDINATES})


// //THUNKS

//SAM: put remove thunk here
///// --- make sure to redirect them to homepage

//SAM: update status for individual user

export function declineInvitation(tripId,userId) {
	return function thunk (dispatch) {
		return axios.delete(`/api/attendee/${tripId}/${userId}`)
			.then(() => {const action = declineInvitationAction()
				dispatch(action)
				//this dispatches the declineInvitationAction to the store
			})
	}
}


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


/**
 * REDUCER
 */
export default function (state = currentTrip, action) {
	switch (action.type) {
	case POST_TRIP:
		return state
	case GET_TRIP:
		return action.trip
	case DECLINE_INVITATION:
		return state
	default:
		return state
	}
}
