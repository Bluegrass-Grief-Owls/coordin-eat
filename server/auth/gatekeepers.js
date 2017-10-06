const { Trip, Attendee, User } = require('../db/models')

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	} else {
		res.status(403).send(
			`<h3>403 forbidden</h3>
			<p>Hi, Dan!</p>`
		)
	}
}

function isTripOwner(req, res, next) {
	const tripId = req.body.tripId || req.params.tripId
	
	Trip.findById(tripId)
		.then((trip) => {
			if (trip && (trip.ownerId === req.user.id)) {
				return next()
			} else {
				res.status(403).send(
					`<h3>403 forbidden</h3>
					<p>Mr. Postman, look and see</p>
					<p>Is there a letter in your bag for me?</p>`
				)
			}
		})
		.catch(next)
}

function isAttendee(req, res, next) {
	const tripId = req.body.tripId || req.params.tripId
	Trip.findById(tripId, {
		include: [{ model: Attendee, include: [User] }]
	})
		.then((trip) => {
			if (trip && (trip.attendees.some(attendee => attendee.userId === req.user.id))) {
				return next()
			} else {
				res.status(403).send(
					`<h3>403 forbidden</h3>
					<p>(I'm spying on you!)</p>`
				)
			}
		})
		.catch(next)
}

module.exports = { isLoggedIn, isTripOwner, isAttendee }