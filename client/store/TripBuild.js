import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_ORIGIN = 'ADD_ORIGIN'
const REMOVE_ORIGIN = 'REMOVE_ORIGIN'

/**
 * INITIAL STATE
 */
const originArray = []

/**
 * ACTION CREATORS
 */
const addOrigin = origin => ({type: ADD_ORIGIN, origin})
const removeOrigin = origin => ({type: REMOVE_ORIGIN, origin})



/**
 * REDUCER
 */
export default function (state = originArray, action) {
	switch (action.type) {
	case ADD_ORIGIN:
		return action.origin
	case REMOVE_ORIGIN:
		return originArray
	default:
		return state
	}
}
