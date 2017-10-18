const client = require('@google/maps').createClient({
	key: process.env.GOOGLE_DIRECTIONS_KEY_1,
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
		.catch(console.error.bind(console))
}

module.exports = getTravelTime