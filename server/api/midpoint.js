const router = require('express').Router()
const midpointAlgorithm = require('../midpointAlgorithm')
module.exports = router

router.post('/', (req, res, next) => { //just using post because it allows request to have a body
	console.log('**', (req.body))
	const point = midpointAlgorithm(JSON.parse(req.body.places))
	res.json(point)
})
