const router = require('express').Router()
const {Trip, Attendee} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
	Attendee.create(req.body)
		.then(trip => res.json(trip))
		.catch(next)
})

