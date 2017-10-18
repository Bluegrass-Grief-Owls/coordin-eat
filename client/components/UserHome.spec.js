/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserHome} from './UserHome.jsx'

describe('UserHome', () => {
	let userHome
	const props = {
		user: {name: 'Cody', email: 'cody@email.com'},
		myTrips: []
	}

	beforeEach(() => {
		userHome = shallow(<UserHome {...props} />)
	})

	it('renders the name in an h3 with class .welcomeUser', () => {
		expect(userHome.find('.welcomeUser').text()).to.be.equal('Welcome, Cody!')
	})
})
