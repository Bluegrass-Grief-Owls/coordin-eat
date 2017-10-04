import axios from 'axios'
import history from '../history'
import Promise from 'bluebird'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'
const POST_TRIP = 'POST_TRIP'
const DECLINE_INVITATION = 'DECLINE_INVITATION'
const SET_COORDINATES = 'SET_COORDINATES'
const VOTED = 'VOTED'
const UPDATE_STATUS = 'UPDATE_STATUS'

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
const declineInvitationAction = (userId) => ({type: DECLINE_INVITATION})
const setCoordinatesAction = (coordsArray) => ({type:SET_COORDINATES, coordsArray})
const voteAction = (choiceObj) => ({type: VOTED, choiceObj})
const updateTripStatus = (updatedTrip) => ({type: UPDATE_STATUS, updatedTrip})


// //THUNKS

//SAM: update status for individual user
////kept here: currentTrip.attendees[index].origin

export function setCoordinates(coords, tripId, userId){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + tripId, {origin: coords})
			.then(() => dispatch(setCoordinatesAction([coords,userId])))
	}
}
//talk to forrest about how this actually works

export function declineInvitation(tripId,userId) {
	return function thunk (dispatch) {
		return axios.delete(`/api/attendee/${tripId}/${userId}`)
			.then(() => {const action = declineInvitationAction(userId)
				dispatch(action)
				history.push('/home')
			})
	}
}


export function postTrip(trip, invitedIdArray) {
	return function thunk(dispatch) {
		return axios.post('/api/trip', trip)
			.then(res => res.data)
			.then(newTrip => {
				newTrip.attendees = []
				Promise.map(invitedIdArray, userId => { //post each invited user to the attendees table
					return axios.post('/api/attendee', { tripId: newTrip.id, userId })
				})
					.then(() => { //once ALL posts have succeeded,
						return axios.post('/api/email/invite', { tripId: newTrip.id, invitees: invitedIdArray })
					})
					.then(() => { //once invites have successfully been sent
						dispatch(postTripAction())
						history.push(`/trip/${newTrip.id}`)
					})
			})
			.catch(console.error.bind(console))
	}
}

export function fetchTrip(tripId) {
	return function thunk(dispatch) {
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
	case DECLINE_INVITATION:
		return Object.assign({}, state, {attendees: state.attendees.filter(attendee => {
			return attendee.id != action.userId
		})} )
	case SET_COORDINATES:
		return Object.assign({}, state, {attendees: state.attendees.map(attendee => {
			if (attendee.userId == action.coordsArray[1] ) {
				let tempObj = attendee
				tempObj.origin = action.coordsArray[0]
				return tempObj
			} else {
				return attendee
			}
		})})
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
