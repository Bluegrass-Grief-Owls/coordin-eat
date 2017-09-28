/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Location = db.model('location')

describe('User model', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	describe('getterMethods', () => {
		describe('location pair', () => {
			let homeLocation

			beforeEach(() => {
				return Location.create({
					name: 'Home',
					xCoordinate: 50,
					yCoordinate: 25
				})
					.then(location => {
						homeLocation = location
					})
			})

			it('should return the correct X coordinate', () => {
				expect(homeLocation.coordinateSet[0]).to.be.equal(50)
			})

			it('should return the correct Y coordinate', () => {
				expect(homeLocation.coordinateSet[1]).to.be.equal(25)
			})
		}) // end describe('location pair')
	}) // end describe('getterMethods')
}) // end describe('Location model')
