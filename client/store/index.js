import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import yelp from './yelp'
import currentTrip from './currentTrip'
import Results from './Results'
import vote from './vote'

const reducer = combineReducers({user, currentTrip, Results, yelp, vote})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './yelp'
export * from './currentTrip'
export * from './Results'
export * from './vote'
