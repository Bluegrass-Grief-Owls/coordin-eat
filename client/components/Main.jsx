import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
	const {children, handleClick, isLoggedIn} = props

	return (
		<div>
			<div className='backgroundMainColor fontAccentColorLight'>
				<Link className='linkOnNav' to='/home'><h1 className='noMargin marginLeft15'>Coordin-EAT</h1></Link>
				<nav>
					{
						isLoggedIn
							? <div>
								{/* The navbar will show these links after you log in */}
								<a className='linkOnNav' href='#' onClick={handleClick}>Logout</a>
								<Link className='linkOnNav' to='/build_trip'>Build a Trip</Link>
							</div>
							: <div>
								{/* The navbar will show these links before you log in */}
								<Link className='linkOnNav' to='/login'>Login</Link>
								<Link className='linkOnNav' to='/signup'>Sign Up</Link>
							</div>
					}
				</nav>
			</div>
			<hr className='noMargin hrColor'/>
			<div className='backgroundMainColorLight fontAccentColor contentDiv'>
				{children}
			</div>
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.id
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleClick () {
			dispatch(logout())
		}
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
	children: PropTypes.object,
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
