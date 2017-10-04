const nodeMailer = require('nodemailer')
const router = require('express').Router()
const { User } = require('../db/models')
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

router.post('/invite', (req, res) => { //just using post because it allows request to have a body
	const url = 'http://localhost:8080/trip/' + req.body.tripId //or 'http://coordin-Eat.herokuapp.com/trips/ + req.body.tripName		
	User.findById(req.user.id)
		.then(user => {
			return Promise.map(req.body.invitees, inviteeId => {
				return User.findById(inviteeId)
					.then(invitee => {
						sendMail(url, user.name, invitee.email, () => res.sendStatus(200))
					})
			})
		})
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