const manhattanNW = [40.813765, -73.959703]
const manhattanSW = [40.748876, -74.006936]
const manhattanSE = [40.736821, -73.978567]
const manhattanRec = [manhattanNW, manhattanSW, manhattanSE]

const bkqueensNW = [40.724311, -73.955616]
const bkqueensSW = [40.632278, -74.024884]
const bkqueensSE = [40.607248, -73.940419] 
const bkqueensRec = [bkqueensNW, bkqueensSW, bkqueensSE]

const bxNW = [40.859941, -73.912531]
const bxSW = [40.807559, -73.928704]
const bxSE = [40.812789, -73.900186] 
const bxRec = [bxNW, bxSW, bxSE]

const addVect = (vec1, vec2, vec3) => {
	return [vec1[0] + vec2[0] + vec3[0], vec1[1] + vec2[1] + vec3[1],]
}

const addVect2 = (vec1, vec2) => {
	return [vec1[0] + vec2[0], vec1[1] + vec2[1]]
}

const subVect = (vec1, vec2) => {
	return [vec1[0] - vec2[0], vec1[1] - vec2[1]]
}

const scaleVect = (vec1, scale) => {
	return [vec1[0] * scale, vec1[1] * scale]
}

const mapXYtoLatLng = (xy = [], NW, SW, SE) => { // x and y are real nums btwn 0 and 1
	const yVect = subVect(NW,SW)
	const xVect = subVect(SE, SW)
	return addVect(SW, scaleVect(xVect, xy[0]), scaleVect(yVect, xy[0]))
}

// console.log(mapXYtoLatLng([.5,.5], ...manhattanRec))
// console.log(mapXYtoLatLng([1,1], ...bkqueensRec))
// console.log(mapXYtoLatLng([1,1], ...bxRec))

const randomCoords = () => {
	const boro = Math.random()
	const inBoro = [Math.random(), Math.random()]
	if (boro < .2) return [...mapXYtoLatLng(inBoro, ...bxRec), 0]
	else if (boro < .8) return [...mapXYtoLatLng(inBoro, ...manhattanRec), 1]
	else return [...mapXYtoLatLng(inBoro, ...bkqueensRec), 2]
}

const twoFriends = () => {
	return [randomCoords(), randomCoords()]
}	
const tf = twoFriends()

console.log(tf)

const midVector = (twoF = [], scale) => {
	const vect = subVect(...twoF)
	return [-vect[1] * scale, vect[0] * scale]
}

const alongMidline = (twoF = [], scale) => {
	const avg = [(twoF[0][0]+twoF[1][0]) * .5, (twoF[0][1]+twoF[1][1]) * .5]
	const mVect = midVector(twoF, scale)
	return addVect2(avg, mVect)
}

console.log(alongMidline(tf, .2))

// 40.81968977589759, -73.9192938683323 ],
//   [ 40.685192623966245, -73.90347564684862

// =======================================

// const client = require('@google/maps').createClient({
// 	key: 'AIzaSyB6N413BwZWE2KkNTdb0wsxQZw6VlrUvdU',
// 	Promise: Promise
// })

// const getTravelTime = (origin, dest, mode) => {
// 	const query = {
// 		origins: [origin],
// 		destinations: [dest],
// 		mode: mode
// 	}
// 	return client.distanceMatrix(query).asPromise()
// 		.then(res => res.json.rows[0].elements[0].duration.value / 60.0)
// 		.catch(console.log)
// 	// 	, (res, status) => {
// 	// 	const tTime = res.rows.elements[0].duration.value / 60.0
// 	// 	console.log('time is', tTime)
// 	// })
// }

// getTravelTime([40.739999, -73.983083], [40.768007, -74.204254], 'transit')
// 	.then(console.log)