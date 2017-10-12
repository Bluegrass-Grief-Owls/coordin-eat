import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import yelp from './yelp'
import currentTrip from './currentTrip'
import myTrips from './myTrips'
import results from './results'
import users from './users'
import currentLocation from './currentLocation'

const reducer = combineReducers({
	user, 
	currentTrip, 
	results, 
	yelp,
	users,
	myTrips,
	currentLocation
})

let store

if (process.env.NODE_ENV === 'development') {	
	const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
	store = createStore(reducer, middleware)
} else {
	const middleware = applyMiddleware(thunkMiddleware)
	store = createStore(reducer, middleware)
}

export default store
export * from './user'
export * from './yelp'
export * from './currentTrip'
export * from './myTrips'
export * from './results'
export * from './users'
export * from './currentLocation'
