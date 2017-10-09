import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */

const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
	dispatch =>
		axios.get('/api/users')
			.then(res =>
				dispatch(getUsers(res.data || defaultUsers)))
			.catch(console.error.bind(console))

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
	switch (action.type) {
	case GET_USERS:
		return action.users
	default:
		return state
	}
}
