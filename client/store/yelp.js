import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_YELP_LIST = 'GET_YELP_LIST'

/**
 * INITIAL STATE
 */
const yelpList = []

/**
 * ACTION CREATORS
 */
const getYelpListAction = yelpList => ({type: GET_YELP_LIST, yelpList})


/**
 * THUNK CREATORS
 */
export const getYelpList = (coords) =>
	dispatch =>
		axios.get(`/api/yelp/${coords[0]}/${coords[1]}`)
			.then(results => {
				dispatch(getYelpListAction(results.data))
			})
			.catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = yelpList, action) {
	switch (action.type) {
	case GET_YELP_LIST:
		return action.yelpList
	default:
		return state
	}
}
