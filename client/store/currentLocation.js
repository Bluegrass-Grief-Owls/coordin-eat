import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_COORDS = 'SET_COORDS'

/**
 * INITIAL STATE
 */
const currentLocation = [null, null]

/**
 * ACTION CREATORS
 */
export const setCurrentCoords = (coordArray) => ({type: SET_COORDS, coordArray})

// //THUNKS

/**
 * REDUCER
 */
export default function (state = currentLocation, action) {
	switch (action.type) {
	case SET_COORDS:
		return action.coordArray
	default:
		return state
	}
}
