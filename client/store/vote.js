import axios from 'axios'

/**
 * ACTION TYPES
 */
const VOTED = 'VOTED'
const GET_VOTE = 'GET_VOTE'

/**
 * INITIAL STATE
 */
const choice = null

/**
 * ACTION CREATORS
 */
const voteAction = optionIndex => ({type: VOTED, optionIndex})
const getVoteAction = vote => ({type: GET_VOTE, vote})

/**
 * THUNK CREATORS
 */

export function postVote(optionIndex, tripId){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + tripId, {vote: optionIndex})
			.then(() => {
				dispatch(voteAction(optionIndex))
			})
	}
}

export function getVote(user, trip){
	console.log('trying to get vote!')
	return function thunk (dispatch) {
		trip.attendees.forEach((attendee) =>{
			if(attendee.userId === user.id){
				const action = getVoteAction(attendee.vote)
				dispatch(action)
			}
		})
	}
}

/**
 * REDUCER
 */
export default function (state = choice, action) {
	switch (action.type) {
	case VOTED:
		return action.optionIndex
	case GET_VOTE:
		return action.vote
	default:
		return state
	}
}
