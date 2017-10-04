const router = require('express').Router()
const {Trip, Attendee, User} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
	Trip.findById(req.params.id, {
		include: [ {model: Attendee, include: [User]} ]
	})
		.then(trip => res.json(trip))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Trip.create(req.body)
		.then(trip => res.json(trip))
		.catch(next)
})

