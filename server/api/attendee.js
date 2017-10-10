const router = require('express').Router()
const { Trip, Attendee } = require('../db/models')
const { isLoggedIn, isTripOwner } = require('../auth/gatekeepers')
module.exports = router

router.post('/', isTripOwner, (req, res, next) => {
	Attendee.create(req.body)
		.then(attendee => res.json(attendee))
		.catch(next)
})

router.delete('/:tripId/:userId', isTripOwner, (req, res, next) => {
	Attendee.destroy({
		where: {
			tripId: req.params.tripId,
			userId: req.params.userId
		}
	})
		//I'm not sending back the deleted attendance, I'm sending back the whole trip!
		.then(() => Trip.findById(req.params.tripId, {include: [ Attendee ]})
			.then((trip) => res.json(trip)))
		.catch(next)
})

router.put('/:tripId', (req, res, next) => {
	Attendee.findOne({
		where: {
			tripId: req.params.tripId,
			userId: req.user.id
		}
	})
		.then(attendee => attendee.update(req.body)
			//I'm not sending back the updated attendance, I'm sending back the whole trip!
			.then(() => Trip.findById(req.params.tripId, { include: [Attendee] })
				.then((trip) => res.json(trip))))
		.catch(next)
})

router.get('/', (req, res, next) => {
	Attendee.findAll({ where: { userId: req.user.id }, include: [{ model: Trip }] })
		.then(attendeeList => res.json(attendeeList))
		.catch(next)
})
