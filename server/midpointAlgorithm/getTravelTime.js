const client = require('@google/maps').createClient({
	key: process.env.GOOGLE_DIRECTIONS_KEY,
	Promise: Promise
})

const getTravelTime = (origin, dest, mode) => {
	const query = {
		origins: [origin],
		destinations: [dest],
		mode: mode
	}
	return client.distanceMatrix(query).asPromise()
		.then(res => res.json.rows[0].elements[0].duration.value / 60.0)
		.catch(console.log)
	// 	, (res, status) => {
	// 	const tTime = res.rows.elements[0].duration.value / 60.0
	// 	console.log('time is', tTime)
	// })
}

// getTravelTime([40.739999, -73.983083], [40.768007, -74.204254], 'transit')
// 	.then(console.log)

module.exports = getTravelTime