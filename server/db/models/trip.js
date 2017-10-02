const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	date: {
		type: Sequelize.DATE,
		allowNull: false
	},
	ownerId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	meetup: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	},
	// yelpResult: {
	// 	type: Sequelize.ARRAY(Sequelize.JSON)
	// }
})

module.exports = Trip
