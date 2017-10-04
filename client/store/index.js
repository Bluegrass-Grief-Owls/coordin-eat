import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import yelp from './yelp'
import currentTrip from './currentTrip'
import myTrips from './myTrips'
import results from './results'
import users from './users'
import friends from './friends'
//import vote from './vote'

const reducer = combineReducers({
	user, 
	currentTrip, 
	results, 
	yelp,
	users,
	friends,
	//vote,
	myTrips
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './yelp'
export * from './currentTrip'
export * from './myTrips'
export * from './results'
export * from './users'
export * from './friends'
// export * from './vote'
