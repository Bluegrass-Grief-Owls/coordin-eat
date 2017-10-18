const chai = require('chai')
const chaiAlmost = require('chai-almost')
chai.use(chaiAlmost())		// almost is used to deal with floating point errors
							// which in our case can be ignored

const {expect} = require('chai')

const {
	anneal,
	addVect,
	scaleVect,
	centerCoord,
	maxDistanceFromCentroid,
	createCandidates,
	getTravelTime,
	locationScore
} = require('../annealing')

describe('meetup algorithm', () => {
	beforeEach(() => {
		return 1
	})

	describe('vector functions', () => {
		describe('addVect', () => {
			it('can add two 2D vectors', () => {
				const vect1 = [3,4.5]
				const vect2 = [-1.2,15]
				const result = addVect(vect1, vect2)
				expect(result).to.be.deep.almost([1.8,19.5])
			})
			it('can add more than two 2D vectors', () => {
				const vect1 = [3,4.5]
				const vect2 = [-1.2,15]
				const vect3 = [1.44, -33.3]
				const vect4 = [21, .115]
				const result = addVect(vect1, vect2, vect3, vect4)
				expect(result).to.be.deep.almost([24.24,-13.685])
			})
		})
		describe('scaleVect', () => {
			it('can mult a 2D vector by a scalar', () => {
				const vect = [3.2,4.15]
				const scalar = 3.4
				const result = scaleVect(vect, scalar)
				expect(result).to.be.deep.almost([10.88,14.11])
			}) 
		})
		describe('centerCoord', () => {
			it('can find the geographic center of 2 coords', () => {
				const coord1 = [40.719560, -73.992460]
				const coord2 = [40.812816, -73.954986]
				const result = centerCoord(coord1, coord2)
				expect(result).to.be.deep.almost([40.766188, -73.973723])
			}) 
		})
		describe('centerCoord', () => {
			it('can find the geographic center of many coords', () => {
				const coord1 = [40.719560, -73.992460]
				const coord2 = [40.812816, -73.954986]
				const coord3 = [40.811393, -73.920687]
				const coord4 = [40.682307, -73.953353]
				const result = centerCoord(coord1, coord2, coord3, coord4)
				expect(result).to.be.deep.almost([40.756519, -73.955371])
			}) 
		})
	}) 
}) 
