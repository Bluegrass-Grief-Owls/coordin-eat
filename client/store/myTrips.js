import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MY_TRIPS = 'GET_MY_TRIPS'

/**
 * INITIAL STATE
 */
const myTrips = []

/**
 * ACTION CREATORS
 */

const fetchTripAction = (trips) => ({type: GET_MY_TRIPS, trips})

// //THUNKS

export function fetchMyTrips(userId){
	return function thunk (dispatch) {
		return axios.get(`/api/attendee/${userId}`)
			.then(res => res.data)
			.then(trips => {
				//This is actually a list of attendances attached with the trip they attended
				dispatch(fetchTripAction(trips))
			})
			.catch(console.error.bind(console))
	}
}

/**
 * REDUCER
 */
export default function (state = myTrips, action) {
	switch (action.type) {
	case GET_MY_TRIPS:
		return action.trips
	default:
		return state
	}
}
