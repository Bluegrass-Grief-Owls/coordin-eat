const router = require('express').Router()
var fetch = require('node-fetch')
const { isLoggedIn } = require('../auth/gatekeepers')
module.exports = router

router.get('/:xcoord/:ycoord', isLoggedIn, (req, res, next) => {
	let theRadius = 200
	let resultArr = []
	let promiseArray = []
	let term = 'restaurants'
	const resolveQuery = function() {
		Promise.all(promiseArray)
			.then(() => {
				if(resultArr.length || theRadius > 80000){
					res.json(resultArr)
				} else {
					theRadius *= 2
					promiseArray = []
					yelpQuery(theRadius)
				}
			})
			.catch(next)
	}

	const yelpQuery = function(radius){
		promiseArray.push(fetch('https://api.yelp.com/v3/businesses/search?term=' + term + '&latitude=' + req.params.xcoord + '&longitude=' + req.params.ycoord + '&radius=' + radius + '&limit=5'/*&offset=' + offset*/,
			{method: 'GET', headers: {'Authorization': 'Bearer ' + process.env.YELP_ACCESS_TOKEN}}
		)
			.then(data => data.json())
			.then(searchResults => {
				let businesses = searchResults.businesses
				if(businesses){
					businesses.forEach(business =>{
						resultArr.push(business)
					})
				}
				resolveQuery()
			})
			.catch(next)
		)
	}

	yelpQuery(theRadius)
})
