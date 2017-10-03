const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/yelp', require('./yelp'))
router.use('/midpoint', require('./midpoint'))
router.use('/email', require('./email'))
router.use('/trip', require('./trip'))
router.use('/attendee', require('./attendee'))
router.use('/friends', require('./friends'))

router.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})
