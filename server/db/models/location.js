const Sequelize = require('sequelize')
const db = require('../db')

/* Assosciations are defined in index.js, but for easier reference, here are the ones
relating to this model:

Trip.hasMany(Attendee)
Attendee.belongsTo(Trip)
 */

const Location = db.define('location', {
	name: {
		type: Sequelize.STRING
	},
	xCoordinate: {
		type: Sequelize.FLOAT
	},
	yCoordinate: {
		type: Sequelize.FLOAT
	}
}, {
	getterMethods: {
		coordinateSet() {
			return [this.xCoordinate, this.yCoordinate]
		}
	}
})

module.exports = Location
