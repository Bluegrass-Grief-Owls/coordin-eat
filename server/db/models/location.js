const Sequelize = require('sequelize')
const db = require('../db')

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
