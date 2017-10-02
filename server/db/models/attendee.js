const Sequelize = require('sequelize')
const db = require('../db')

const Attendee = db.define('attendees', {
	origin: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	},
	vote: {
		type: Sequelize.INTEGER,
		defaultValue: -1
	}
})

module.exports = Attendee
