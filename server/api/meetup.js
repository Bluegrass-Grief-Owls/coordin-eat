const router = require('express').Router()
const anneal = require('../annealing')
module.exports = router

router.post('/', (req, res, next) => { //just using post because it allows request to have a body
	const origins = req.body.origins
	console.log('the origin', origins)
	anneal(origins)
		.then(res => {
			return anneal(origins, res[0], res[1], .7)
		})
		.then(meetup => {
			console.log('the meetup', meetup)
			res.json(meetup[0])
		})
		.catch(next)
})
