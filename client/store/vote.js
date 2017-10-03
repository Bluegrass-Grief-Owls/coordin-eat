import axios from 'axios'

/**
 * ACTION TYPES
 */
const VOTED = 'VOTED'

/**
 * INITIAL STATE
 */
const choice = null

/**
 * ACTION CREATORS
 */
const voteAction = optionIndex => ({type: VOTED, optionIndex})

/**
 * THUNK CREATORS
 */

export function vote(optionIndex, tripId){
	return function thunk (dispatch) {
		return axios.put('/api/attendee/' + tripId, {vote: optionIndex})
			.then(() => dispatch(voteAction(optionIndex)))
	}
}

/**
 * REDUCER
 */
export default function (state = choice, action) {
	switch (action.type) {
	case VOTED:
		return action.optionIndex
	default:
		return state
	}
}
