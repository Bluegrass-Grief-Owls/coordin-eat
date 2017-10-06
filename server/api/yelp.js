const router = require('express').Router()
var fetch = require('node-fetch')
const { isLoggedIn } = require('../auth/gatekeepers')
module.exports = router

router.get('/:xcoord/:ycoord', isLoggedIn, (req, res, next) => {
	let theresMore = true
	let resultArr = []
	let promiseArray = []
	let term = 'restaurants'
	while(theresMore){
		theresMore = false
		promiseArray.push(fetch('https://api.yelp.com/v3/businesses/search?term=' + term + '&latitude=' + req.params.xcoord + '&longitude=' + req.params.ycoord + '&radius=200&limit=5'/*&offset=' + offset*/,
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
			})
			.catch(next)
		)
	}
	Promise.all(promiseArray)
		.then(() => {
			res.json(resultArr)
		})
})
