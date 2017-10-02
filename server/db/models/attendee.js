const Sequelize = require('sequelize')
const db = require('../db')

const Attendee = db.define('attendees', {
	origin: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	},
	vote: {
		type: Sequelize.INTEGER
	}
})

module.exports = Attendee
