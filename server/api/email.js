const nodeMailer = require('nodemailer')
const router = require('express').Router()
const { User } = require('../db/models')
const { isTripOwner } = require('./gatekeepers')
const Promise = require('bluebird')


module.exports = router

let transporter = nodeMailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
})

router.post('/invite', isTripOwner, (req, res) => { //just using post because it allows request to have a body
	const domain = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : 'http://coordin-Eat.herokuapp.com'
	const url = `${domain}/trip/${req.body.tripId}`
	User.findById(req.user.id)
		.then(user => {
			return Promise.map(req.body.invitees, inviteeId => {
				return User.findById(inviteeId)
					.then(invitee => {
						sendMail(url, user.name, invitee.email)
					})
			})
		})
		.then(() => res.sendStatus(200))
})

function sendMail(url, senderName, recipient, callback) {
	transporter.sendMail({
		from: 'noreply@coordin-eat.com',
		to: recipient,
		subject: senderName + ' has invited you',
		text: 'Use this link to accept or decline: ' + url,
		html: `<p>Use this link to accept or decline: <a href="${url}">${url}</a></p>`
	}, callback)
}