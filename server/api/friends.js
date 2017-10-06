const router = require('express').Router()
const {User} = require('../db/models')
const { isLoggedIn } = require('./gatekeepers')

module.exports = router

//doesn't need myId in params anymore, but taking it out is outside the scope of this branch
router.post('/:myId/:friendId', isLoggedIn, (req, res, next) => { 
	User.findById(req.user.id)
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

