const router = require('express').Router()
const {Trip, Attendee, User} = require('../db/models')
const { isLoggedIn, isTripOwner, isAttendee } = require('./gatekeepers')
module.exports = router

router.get('/:id', isAttendee, (req, res, next) => {
	Trip.findById(req.params.id, {
		include: [ {model: Attendee, include: [User]} ]
	})
		.then(trip => res.json(trip))
		.catch(next)
})

router.post('/', isLoggedIn, (req, res, next) => {
	Trip.create(req.body)
		.then(trip => res.json(trip))
		.catch(next)
})

router.put('/:tripId', isTripOwner, (req, res, next) => {
	Trip.findById(req.params.tripId, {include: [Attendee]})
		.then(trip => trip.update(req.body))
		.then(updatedTrip => res.json(updatedTrip))
		.catch(next)
})

