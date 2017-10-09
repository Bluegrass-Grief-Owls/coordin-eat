import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
	const {name, displayName, handleSubmit, needsname, error} = props

	return (
		<div>
			<form onSubmit={handleSubmit} name={name}>
				{needsname ? <div className='displayBlock'>
					<label htmlFor='submitName'><small className='fontMainColorLight'>Name</small></label>
					<input className='backgroundMainColor' name='submitName' type='text' />
				</div> : <div />}
				<div className='displayBlock'>
					<label htmlFor='email'><small className='fontMainColorLight'>Email</small></label>
					<input className='backgroundMainColor' name='email' type='text' />
				</div>
				<div className='displayBlock'>
					<label htmlFor='password'><small className='fontMainColorLight'>Password</small></label>
					<input className='backgroundMainColor' name='password' type='password' />
				</div>
				<div className='displayBlock'>
					<Button className='tripButton' type='submit'>{displayName}</Button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
			<a className='fontAccentColor marginLeft15' href='/auth/google'>{displayName} with Google</a>
		</div>
	)
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.user.error
	}
}

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		needsname: true,
		error: state.user.error
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit (evt) {
			evt.preventDefault()
			const formName = evt.target.name
			const email = evt.target.email.value
			const password = evt.target.password.value
			const username = evt.target.submitName ? evt.target.submitName.value : ''
			console.log(username)
			dispatch(auth(email, password, username, formName))
		}
	}
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
}
