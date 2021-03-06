const Chance = require('chance')
const chance = new Chance()
var math = require('mathjs')

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

const bxP = .2
const mP = .6

const addVect = (...arr) => {
	const result = [0,0]
	arr.map((el) => {
		result[0] += el[0]
		result[1] += el[1]
	})
	return result
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
	if (boro < bxP) return [...mapXYtoLatLng(inBoro, ...bxRec)]
	else if (boro < bxP + mP) return [...mapXYtoLatLng(inBoro, ...manhattanRec)]
	else return [...mapXYtoLatLng(inBoro, ...bkqueensRec)]
}

const twoFriends = () => {
	return [randomCoords(), randomCoords()]
}	
const tf = twoFriends()

const nFriends = (n) => {
	const result = []
	for (let l = 0; l < n; l++) {
		result.push(randomCoords())
	}
	return result
}

// =============== ARCHIVE ================================

// const midVector = (twoF = [], scale) => {
// 	const vect = subVect(...twoF)
// 	return [-vect[1] * scale, vect[0] * scale]
// }

// const alongMidline = (twoF = [], scale) => {
// 	const avg = [(twoF[0][0]+twoF[1][0]) * .5, (twoF[0][1]+twoF[1][1]) * .5]
// 	const mVect = midVector(twoF, scale)
// 	return addVect(avg, mVect)
// }

// const mid = alongMidline(tf, .3)

// console.log(mid)

// const dist = (xy, ij) => {
// 	return Math.sqrt((ij[1]-xy[1])*(ij[1]-xy[1]) + (ij[0]-xy[0])*(ij[0]-xy[0]))
// }

// console.log(dist([0,0], [5,12]))
// const checkDist = (friends, mid) => {
// 	const dist1 = dist(friends[0], mid)
// 	const dist2 = dist(friends[1], mid)
// 	return [dist1, dist2]
// }

// console.log(checkDist(tf, mid))
