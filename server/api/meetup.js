const router = require('express').Router()
const anneal = require('../annealing')
module.exports = router

router.post('/', (req, res, next) => { //just using post because it allows request to have a body
	const origins = req.body.origins
	console.log('the origin', origins)
	anneal(origins, 25)
		.then(res => {
			// console.log(res)
			return anneal(origins, 25, res[0], res[1] )
		})
		.then(meetup => {
			console.log('the meetup', meetup)
			res.json(meetup[0])
		})
		.catch(next)
})
