const Sequelize = require('sequelize')
const db = require('../db')

/* Assosciations are defined in index.js, but for easier reference, here are the ones
relating to this model:

Trip.hasMany(Attendee)
User.hasMany(Attendee)
Attendee.belongsTo(Trip)
Attendee.belongsTo(User)
 */

const Attendee = db.define('attendee', {
	origin: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	},
	vote: {
		type: Sequelize.INTEGER,
		defaultValue: -1
	}
})

module.exports = Attendee
