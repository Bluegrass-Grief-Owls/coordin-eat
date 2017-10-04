const Chance = require('chance')
const chance = new Chance()
var math = require('mathjs')

// given a center (mean) coordinate, gives a random coordinate based on the normal distribution
// has arguments for std and bound
const normalCoord = (center, stDev, deviationBound) => {
	let vertDisplacement = chance.normal({dev: stDev})
	vertDisplacement = Math.abs(vertDisplacement) < deviationBound ? vertDisplacement : deviationBound
	let horizDisplacement = chance.normal({dev: stDev})
	horizDisplacement = Math.abs(horizDisplacement) < deviationBound ? horizDisplacement : deviationBound
	return [center[0] + vertDisplacement, center[1] + horizDisplacement]
}

// ======== For testing =========
// const optimalPair = [-.1, .5]
// const k = -1
// const b = 2
// const mocktravelDur = (xyPair) => {
// 	return k * (Math.pow(xyPair[0]-optimalPair[0], 2) + Math.pow(xyPair[1]-optimalPair[1], 2)) + b
// }
// ==============================


// creates random new meetup candidates from a center coordinate
const stdToBound = .5 // ratio between std and bound
const createCandidates = (n, center, bound) => {
	const result = []
	for (let p = 0; p < n; p++){
		result.push(normalCoord(center, stdToBound * bound, bound))
	}
	return result
}


const coordAnneal = (center, startRadius) => {
	let currentCenter = center || [0,0]
	let radius = startRadius || 1
	let resolved = false // for closing the calculation early
	let maxIterations = 3
	let score
	let cands
	let indexOfMax
	while (!resolved && maxIterations > 0) {
		cands = createCandidates(10, currentCenter, radius)
		score = cands.map(cand => cand)
	
		indexOfMax = score.indexOf(Math.max.apply(Math, score))
		currentCenter = cands[indexOfMax]

		radius *= .6

		maxIterations--
		// console.log(cands, score)
	}
	return cands[indexOfMax]
}

// console.log(createCandidates(4, [0,0], 20))
// console.log(coordAnneal([0,0], .7))




// =======================================

const client = require('@google/maps').createClient({
	key: 'AIzaSyB6N413BwZWE2KkNTdb0wsxQZw6VlrUvdU',
	Promise: Promise
})

const getTravelTime = (origin, dest, mode) => {
	const query = {
		origins: [origin],
		destinations: [dest],
		mode: mode
	}
	return client.distanceMatrix(query).asPromise()
		.then(res => {
			console.log('responseeeee', res.json.rows[0].elements[0])
			return res.json.rows[0].elements[0].duration.value / 60.0
		})
		.catch(console.log)
}

// getTravelTime([40.739999, -73.983083], [40.768007, -74.204254], 'transit')
// 	.then(console.log)

const locationPromiseAll = (loc, origins) => {
	const locationsPromises = origins.map(origin => {
		return getTravelTime(origin, loc, 'transit')
	})
	return Promise.all(locationsPromises)
}

const importance = 1
const locationScore = (loc, origins) => {
	return locationPromiseAll(loc, origins)
		.then(times => {
			const sum = times.reduce((a, b) => a + b)
			const std = math.std(times)
			const score = sum * Math.pow(std, importance)
			return score
		})
		.catch(err => console.log(err))
}

const candScorePromiseAll = (candArr, origins) => {
	const candPromises = candArr.map(candidate => {
		return locationScore(candidate, origins)
	})
	return Promise.all(candPromises)
}



// candScorePromiseAll (
// 	[
// 		[ 40.80964019275301, -73.9270895692334 ],
// 		[ 40.85964019275301, -73.9370895692334 ]
// 	],
// 	[
// 		[ 40.76588646255421, -73.9825951401366 ],
// 		[ 40.7971972524459, -73.93779144673098 ],
// 		[ 40.66975627373278, -73.93889311219257 ],
// 		[ 40.76525691298981, -73.9834959844067 ]
// 	]
// ).then(console.log)
//	.catch(err => console.log(err))

// =================================
const investigate = (center, score, bound, numCands, origins) => {
	const cands = createCandidates(numCands, center, bound)
	// console.log('cands', cands)
	// console.log('...origins', origins)
	return candScorePromiseAll(cands, origins)
		.then(scores => {
			console.log('scores', scores)
			const indexOfMax = scores.indexOf(Math.max.apply(Math, score))	
			console.log('here yet')
			const winner = score > scores[indexOfMax] ? [center, score] : [cands[indexOfMax], scores[indexOfMax]]
			return winner	
		})
		.catch(err => console.log(err))
}

investigate (
	[ 40.80964019275301, -73.9270895692334 ],
	123, .05, 10,
	[
		[ 40.76588646255421, -73.9825951401366 ],
		[ 40.7971972524459, -73.93779144673098 ],
		[ 40.66975627373278, -73.93889311219257 ],
		[ 40.76525691298981, -73.9834959844067 ] 
	]
)
	.then(success => {
		console.log('made it!!!!!')
		console.log(success)
	})
	.catch(err => console.log(err))







