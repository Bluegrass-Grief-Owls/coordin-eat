import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
	Main,
	Login,
	Signup,
	UserHome,
	BuildTrip,
	SingleTrip,
	FriendsList,
	InviteFriends,
	UserProfile,
	EditFavorites,
	AboutPage
} from './components'
import { me } from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props


		const routes = isLoggedIn ? [
			<Route path='/home' component={UserHome} key={'UserHome'}/>,
			<Route path='/build_trip' component={BuildTrip}  key={'BuildTrip'} />,
			<Route path='/addfriends' component={InviteFriends}  key={'InviteFriends'} />,
			<Route path='/trip/:tripId' component={SingleTrip}  key={'SingleTrip'} />,
			<Route path='/friends' component={FriendsList}  key={'FriendsList'} />,
			<Route path='/profile' component={UserProfile}  key={'UserProfile'} />,
			<Route path='/editFavorites' component={EditFavorites}  key={'EditFavorites'} />,
			<Route path='/login' component={Login}  key={'Login'} />,
			<Route path='/signup' component={Signup}  key={'Signup'} />,
			<Route path='/about' component={AboutPage}  key={'AboutPage'} />,
			<Redirect to='/home' key={'homeRedirect'}/>,
		] : [
			<Route path='/login' component={Login}  key={'Login'} />,
			<Route path='/signup' component={Signup}  key={'Signup'} />,
			<Route path='/about' component={AboutPage}  key={'AboutPage'} />,
			<Redirect to='/login' key="loginRedirect"/>
		]

		return (
			<Router history={history}>
				<Main>
					<Switch>
						{routes}
					</Switch>
				</Main>
			</Router>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me())
		}
	}
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
