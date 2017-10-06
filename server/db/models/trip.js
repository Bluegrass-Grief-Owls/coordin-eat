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
	status: {
		type: Sequelize.ENUM('confirming', 'voting', 'directions', 'finished'),
		defaultValue: 'confirming',
		allowNull: false,

	},
	ownerId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	meetup: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	},
	yelpString: {
		type: Sequelize.STRING(10000),
	}
},{
	getterMethods: {
		readableDate() {
			let theDate = this.date.toString().slice(0,10)
			return theDate
		},
		time() {
			let temp = this.date.toString().slice(11)
			let theTime = temp.slice(5,10)
			let minute = theTime.slice(2)
			let hour = Number(theTime.slice(0,2))
			let amorpm = ' am'
			if (hour >= 12){
				amorpm = ' pm'
				hour -= 12
			}
			if (hour === 0) {
				hour += 12
			}
			return hour + minute + amorpm
		}
	}
})

module.exports = Trip
