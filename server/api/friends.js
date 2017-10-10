const router = require('express').Router()
const {User} = require('../db/models')
const { isLoggedIn } = require('../auth/gatekeepers')

module.exports = router

router.post('/:friendId', isLoggedIn, (req, res, next) => { 
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

