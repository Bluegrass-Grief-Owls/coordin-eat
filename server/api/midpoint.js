const router = require('express').Router()
const midpointAlgorithm = require('../midpointAlgorithm')
const { isLoggedIn } = require('../auth/gatekeepers')
module.exports = router

router.post('/', isLoggedIn, (req, res, next) => { //just using post because it allows request to have a body
	const point = midpointAlgorithm((req.body.places))
	console.log('from /api/midpoint', point)
	res.json(point)
})
