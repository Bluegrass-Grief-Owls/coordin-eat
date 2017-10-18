/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserHome} from './UserHome.jsx'

describe('UserHome', () => {
	let userHome

	beforeEach(() => {
		userHome = shallow(<UserHome user={{name: 'cody@email.com'}} />)
	})

	it('renders the name in an h3 with class .welcomeUser', () => {
		expect(userHome.find('.welcomeUser').text()).to.be.equal('Welcome, cody@email.com')
	})
})
