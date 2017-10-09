const getTravelTime = require('./getTravelTime')


const averageCoords = (coords) => {
	const coordsLength = coords.length

	const sumX = coords
		.map(coord => coord[0])
		.reduce((a, b) => a + b, 0)

	const sumY = coords
		.map(coord => coord[1])
		.reduce((a, b) => a + b, 0)

	return [(sumX / coordsLength), (sumY / coordsLength)]
}

const midpointAlgorithm = (places) => {//point = averageCoords(places)) => {
	const test1 = averageCoords(places)
	return test1
	// //get travel times to point
	// const travelTimePromises = places.map((place) => getTravelTime(place, point, 'transit'))

	// console.log(point)

	// Promise.all(travelTimePromises)
	// 	.then((travelTimes) => {

	// 		//and assosciate them with their origin points
	// 		const originsWithTimes = places.map((place, index) => {
	// 			return {
	// 				location: place,
	// 				distanceFromPoint: travelTimes[index]
	// 			}
	// 		})

	// 		return point
	// 	})
	// 	.catch(console.error)
	//get longest and second longest times
	//move point towards the person with longest travel time to point
	//the distance to move it could be  (1 - secondLongest / longestTravel) *
	//the distance between the furthes person and the current point
	//if the change is sufficiently small, we're done
}

module.exports = midpointAlgorithm
