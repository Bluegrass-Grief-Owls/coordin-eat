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
const UPDATE_TRIP = 'UPDATE_TRIP'
const IS_LOADING = 'IS_LOADING'
const DONE_LOADING = 'DONE_LOADING'


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
const declineInvitationAction = (userId) => ({type: DECLINE_INVITATION, userId})
const setCoordinatesAction = (coordsArray) => ({type: SET_COORDINATES, coordsArray})
const voteAction = (choiceObj) => ({type: VOTED, choiceObj})
const updateTripAction = (updatedTrip) => ({type: UPDATE_TRIP, updatedTrip})
export const resetCurrentTrip = () => ({type: GET_TRIP, trip: {}})
const loadingAction = () => ({type: IS_LOADING})
const doneLoadingAction = () => ({type: DONE_LOADING})


// //THUNKS

//SAM: update status for individual user
////kept here: currentTrip.attendees[index].origin

export function setCoordinates(coords, tripId, userId){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + tripId, {origin: coords})
			.then((theTrip) => {
				dispatch(setCoordinatesAction([coords, userId]))
				//This route returns the trip, which lets us check to see if all coords are in.
				let RVSPDone = theTrip.data.attendees.every(attendee => {
					return attendee.origin !== null
				})

				if(RVSPDone){
					//Putting origin pairs into an array
					let originArray = []
					theTrip.data.attendees.forEach(attendee => {
						originArray.push(attendee.origin)
					})
					dispatch(loadingAction())
					axios.post('/api/meetup', {origins: originArray})
						.then((meetup) => {
							dispatch(updateTrip({status: 'voting', meetup: meetup.data}, theTrip.data.id))
						})
						.then(() => dispatch(doneLoadingAction()))
						.catch(console.error.bind(console))
				}
			})
	}
}

//This route should also check if the trip is now ready to move onto voting
export function declineInvitation(tripId, userId) {
	return function thunk (dispatch) {
		return axios.delete(`/api/attendee/${tripId}/${userId}`)
			.then((theTrip) => {
				const action = declineInvitationAction(userId)
				dispatch(action)
				//This route returns the trip, which lets us check to see if all coords are in.
				let RVSPDone = theTrip.data.attendees.every(attendee => {
					return attendee.origin !== null
				})
				if(RVSPDone){
					//Putting origin pairs into an array
					let originArray = []
					theTrip.data.attendees.forEach(attendee => {
						originArray.push(attendee.origin)
					})
					dispatch(loadingAction())
					axios.post('/api/meetup', {origins: originArray})
						.then((meetup) => {
							dispatch(updateTrip({status: 'voting', meetup: meetup.data}, theTrip.data.id))
						})
						.then(() => dispatch(doneLoadingAction()))
				}
			})
			.catch(console.error.bind(console))
	}
}


export function postTrip(trip, invitedIdArray) {
	//from buildTrip: trip is an object with name prop that has tripname from synthetic event and date prop which has a formatted date and the owner id
	//this means that this thunk needs to receive a formatted date and owner ID
	//invitedIdArray is an array of friend objects; inconsequential to time

	return function thunk(dispatch) {
		return axios.post('/api/trip', trip)
			.then(res => res.data)
			.then(newTrip => {
				newTrip.attendees = []
				Promise.map(invitedIdArray, userId => { //post each invited user to the attendees table
					return axios.post('/api/attendee', { tripId: newTrip.id, userId })
				})
					.then(() => { //once ALL posts have succeeded,
						return axios.post('/api/email/invite', { trip: newTrip, invitees: invitedIdArray })
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
			.catch(console.error.bind(console))
	}
}

export function postVote(choiceIdx, trip, userId, yelpList){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + trip.id, {vote: choiceIdx})
			.then((theTrip) => {
				let obj = {choiceIdx, userId}
				dispatch(voteAction(obj))
				//This route returns the trip, which lets us check to see if voting is done
				let votingDone = theTrip.data.attendees.every(attendee => {
					return attendee.vote !== -1
				})
				if(votingDone){
					//Adding votes
					let voteCounter = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0,}
					theTrip.data.attendees.forEach(attendee => {
						if(attendee.vote !== -1){
							voteCounter[attendee.vote]++
						}
					})
					//Determine the most voted for
					let largest = []
					let number = voteCounter['0']
					for (var choice in voteCounter){
						if(voteCounter[choice] === number){
							largest.push(choice)
						} else if (voteCounter[choice] > number){
							number = voteCounter[choice]
							largest = [choice]
						}
					}
					//Select a random restaurant from the most voted and stringify it
					let randomChoice = +largest[Math.floor(Math.random() * largest.length)]
					let yelpChoice = JSON.stringify(yelpList[randomChoice])
					dispatch(updateTrip({status: 'directions', yelpString: yelpChoice}, theTrip.data.id))
				}
			})
			.catch(console.error.bind(console))
	}
}

export function updateTrip(trip, tripId, isLeaving){
	return function thunk (dispatch) {
		return axios.put(`/api/trip/${tripId}`, trip)
			.then(tripData => {
				dispatch(updateTripAction(tripData.data))
				if(!isLeaving){
					history.push(`/trip/${tripId}`)
				}
			})
			.catch(console.error.bind(console))
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
		//!!!!!!
		//Ok, this seems weird, but when you press decline, it redirects you to home
		//At home, current trip is {}, so it errors if you filter

		// return Object.assign({}, state, {attendees: state.attendees.filter(attendee => {
		// 	return attendee.id !== action.userId
		// })} )
	case SET_COORDINATES:
		return Object.assign({}, state, {attendees: state.attendees.map(attendee => {
			if (attendee.userId === action.coordsArray[1] ) {
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
	case UPDATE_TRIP:
		return action.updatedTrip
	case IS_LOADING:
		return  Object.assign({}, state, {loading: true})
	case DONE_LOADING:
		return  Object.assign({}, state, {loading: false})
	default:
		return state
	}
}
