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
		type: Sequelize.INTEGER
	}
})

module.exports = Trip
