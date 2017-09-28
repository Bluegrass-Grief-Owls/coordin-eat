import axios from 'axios'
import history from '../history'

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

const getResults = () => {type: GET_RESULTS, results}


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
