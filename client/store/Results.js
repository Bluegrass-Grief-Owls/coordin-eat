import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_RESULTS = 'GET_RESULTS'

/**
 * INITIAL STATE
 */
const resultsArray = []

/**
 * ACTION CREATORS
 */
const getResults = (results) => ({type: GET_RESULTS, results})

//THUNKS
export const calculate = (array) =>
	dispatch =>
		axios.post('/api/midpoint', {places: array})
			.then(res => dispatch(getResults(res.data)))
			.catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = resultsArray, action) {
	switch (action.type) {
	case GET_RESULTS:
		return action.results
	default:
		return state
	}
}
