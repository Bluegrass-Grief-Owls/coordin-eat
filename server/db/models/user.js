const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

/* Assosciations are defined in index.js, but for easier reference, here are the ones
relating to this model:

User.hasMany(Location)
Location.belongsTo(User, {foreignKey: { allowNull: false }, onDelete: 'CASCADE'})
User.belongsToMany(User, {as: 'friend', through: 'friends'})
User.hasMany(Attendee)
Attendee.belongsTo(User)
 */
const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING
	},
	salt: {
		type: Sequelize.STRING
	},
	googleId: {
		type: Sequelize.STRING
	},
	favoriteFood: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: []
	}
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
	return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
	return crypto.createHash('sha1').update(plainText).update(salt).digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt()
		user.password = User.encryptPassword(user.password, user.salt)
	}
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
