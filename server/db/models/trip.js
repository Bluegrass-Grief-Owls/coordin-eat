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
	// yelpResult: {
	// 	type: Sequelize.ARRAY(Sequelize.JSON)
	// }
},{
	getterMethods: {
		readableDate() {
			console.log(this.date)
			let theDate = this.date.toString().slice(0,10)
			// let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			// let month = monthArray[Number(theDate.slice(5,7)) - 1]
			// let day = ' ' + Number(theDate.slice(8,10))
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
