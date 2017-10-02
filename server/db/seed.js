if (process.env.NODE_ENV !== 'production') require('../../secrets')
const db = require('../db')
const User = db.model('user')
const Location = db.model('location')
const Friends = db.model('friends')
const Trip = db.model('trip')
const Attendee = db.model('attendee')
const Chance = require('chance')
const chance = new Chance()
const chalk = require('chalk')
// const initDB = require('./index') 

const promisesUsers = [], 
	promisesLocations = [], 
	promisesFriends = [], 
	promisesTrips = [],
	promisesAttend = []

db.sync({force: true})
	.then(() => {

		//====================================== User seed ==============================================
		const userName = [], userEmail = [], password = []

		//One known user
		userName.push('User')
		userEmail.push('user@gmail.com')
		password.push('123')

		//Four random users
		for (var i = 0; i < 4; i++) {
			userName.push(chance.first())
			userEmail.push(chance.email())
			password.push(chance.string())

		}

		userName.map((val, idx) => {
			promisesUsers.push(User.create({
				name: val,
				email: userEmail[idx],
				password: password[idx]
			}))
		})

		//====================================== Friend seed ==============================================
		const theUserID = 1, friendId = [2, 3, 4, 5]

		//====================================== Trip seed ==============================================
		const tripName = [], tripDate = [], tripOwner = [], meetups = []

		//Five random trips
		for (var j = 0; j < 5; j++) {
			tripName.push(chance.word())
			tripDate.push(chance.date())
			tripOwner.push(chance.integer({min: 1, max: 5}))
			meetups.push([12.3334, 14.234234])
		}

		tripName.map((val, idx) => {
			promisesTrips.push(Trip.create({
				name: val,
				date: tripDate[idx],
				ownerId: tripOwner[idx],
				meetup: meetups[idx]
			}))
		})

		//====================================== Location seed ==============================================

		const locationName = [], xCoordinate = [], yCoordinate = [], userId = []

		const NW = [40.813765, -73.959703]
		const SW = [40.748876, -74.006936]
		const SE = [40.736821, -73.978567]

		const addVect = (vec1, vec2, vec3) => {
			return [vec1[0] + vec2[0] + vec3[0], vec1[1] + vec2[1] + vec3[1],]
		}

		const subVect = (vec1, vec2) => {
			return [vec1[0] - vec2[0], vec1[1] - vec2[1]]
		}

		const scaleVect = (vec1, scale) => {
			return [vec1[0] * scale, vec1[1] * scale]
		}

		const yVect = subVect(NW,SW)
		const xVect = subVect(SE, SW)

		const mapXYtoLatLng = (x, y) => { // x and y are real nums btwn 0 and 1
			return addVect(SW, scaleVect(xVect, x), scaleVect(yVect, y))
		}

		for (i = 1; i <= 5; i++) {
			let push = mapXYtoLatLng (chance.floating({min: 0, max: 1 , fixed: 6}), chance.floating({min: 0, max: 1 , fixed: 6}))
			locationName.push('Home')
			xCoordinate.push(push[0].toFixed(6))
			yCoordinate.push(push[1].toFixed(6))
			userId.push(i)
		}

		// //====================================== Attendee seed ==============================================
		// const origins = [], tripIds = [], userIds = []

		// for (var p = 1; p < 3; p++) {
		// 	// for (var q = 0; q < 4; q++) {
		// 		let pushCoord = mapXYtoLatLng (chance.floating({min: 0, max: 1 , fixed: 6}), chance.floating({min: 0, max: 1 , fixed: 6}))
		// 		origins.push(pushCoord)
		// 		tripIds.push(p)
		// 		userIds.push(p)
		// 	// }
		// }

		// console.log('************', tripIds)

		//====================================== Promises ==============================================

		Promise.all(promisesUsers)
			.then(() => {
				friendId.map((val, idx) => {
					promisesFriends.push(Friends.create({
						userId: theUserID,
						friendId: friendId[idx]
					}))
				})
				return Promise.all(promisesFriends)
			})
			.then(() => {
				locationName.map((val, idx) => {
					promisesLocations.push(Location.create({
						name: val,
						xCoordinate: xCoordinate[idx],
						yCoordinate: yCoordinate[idx],
						userId: userId[idx]
					}))
				})
				return Promise.all(promisesLocations)
			})
			.then(() => {
				return Promise.all(promisesTrips)
			})
			.then(() => {
				console.log(chalk.green('seed success!'))
				process.exit(0)
			})
			.catch((err) => {
				console.error(chalk.red(err.parent))
				//console.log(chalk.blue(`if only getting ${chalk.red('duplicate key value violates unique constraint "products_name_key"')}, it is because only unique product names will be created`))
				process.exit(1)
			})
	})
	.catch(err => console.log(err))