const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/:myId/:friendId', (req, res, next) => {
	User.findById(req.params.myId)
		.then(me => {
			User.findById(req.params.friendId)
				.then(newFriend => {
					me.addFriend(newFriend)
						.then(result => res.json(result) )
				})
		})
		.catch(next)
})

// router.put('/:id', (req, res, next) => {
// 	Attendee.findById(req.params.id)
// 		.then(attendee => attendee.update(req.body)
// 			.then(updated =>res.json(updated)))
// 		.catch(next)
// })

