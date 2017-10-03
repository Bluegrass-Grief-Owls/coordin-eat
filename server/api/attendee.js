const router = require('express').Router()
const {Trip, Attendee} = require('../db/models')
module.exports = router


router.post('/', (req, res, next) => {
	Attendee.create(req.body)
		.then(attendee => res.json(attendee))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	Attendee.findById(req.params.id)
		.then(attendee => attendee.update(req.body)
			.then(updated =>res.json(updated)))
		.catch(next)
})

