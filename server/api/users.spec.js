/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

const codysEmail = 'cody@puppybook.com'
const codysName = 'Cody Dog'
const codysPassword = 'bones'

function promisedCookie() {
	return new Promise((resolve, reject) => {
		request(app).post('/auth/login').send({name: codysName, email: codysEmail, password: codysPassword})
			.end(function(error, response) {
				if (error) reject(error)
				var loginCookie = response.headers['set-cookie']
				resolve(loginCookie)
			})
	})
}

describe('User routes', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	describe('/api/users/', () => {

		beforeEach(() => {
			return User.create({name: codysName, email: codysEmail, password: codysPassword})
		})

		it('GET /api/users', () => {
			return promisedCookie().then(cookie => {
				console.log('cookie is called', cookie)
				const req = request(app)
					.get('/api/users')
					.set('cookie', cookie)
					.expect(200)
					.then(res => {
						expect(res.body).to.be.an('array')
						expect(res.body[0].email).to.be.equal(codysEmail)
					})
				return req
			})
		})
	}) // end describe('/api/users')
}) // end describe('User routes')
