const router = require('express').Router()
const {Trip, Attendee} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
	Attendee.create(req.body)
		.then(attendee => res.json(attendee))
		.catch(next)
})

router.put('/:tripId', (req, res, next) => {
	Attendee.findOne({where: {
		tripId: req.params.tripId, 
		userId: req.user.id}
	})
		.then(attendee => attendee.update(req.body)
			.then(updated =>res.json(updated)))
		.catch(next)
})

router.get('/:userId', (req, res, next) => {
	Attendee.findAll({where: {userId: req.params.userId}, include: [{ model: Trip}]})
		.then(attendeeList => res.json(attendeeList))
		.catch(next)
})