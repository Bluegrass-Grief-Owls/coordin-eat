// const client = require('@google/maps').createClient({
// 	key: 'AIzaSyB6N413BwZWE2KkNTdb0wsxQZw6VlrUvdU',
// 	Promise: Promise
// })

// const getTravelTime = (origins, destinations, mode) => {
// 	const query = {
// 		origins,
// 		destinations,
// 		mode
// 	}
// 	return client.distanceMatrix(query).asPromise()
// 		.then(res => res.json.rows)//[0].elements[0].duration.value / 60.0 )
// }

// getTravelTime([40.7048547, -74.0123736], [[40.703383, -73.986312], [40.688182, -73.995982]], 'transit')
// 	.then((rows) => rows.forEach((row) => console.log(row.elements[0])))
  
// //each row seems to be the distances from a given origin, 
// //with each element in it being the route to a destination