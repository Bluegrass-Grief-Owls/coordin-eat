const router = require('express').Router()
const midpointAlgorithm = require('../midpointAlgorithm')
const { isLoggedIn } = require('./gatekeepers')
module.exports = router

router.post('/', isLoggedIn, (req, res, next) => { //just using post because it allows request to have a body
	console.log('**', (req.body))
	const point = midpointAlgorithm((req.body.places))
	console.log("THIS IS THE POINT", Array.isArray(point))
	console.log("0th index", point[0])
	res.json(point)
})
