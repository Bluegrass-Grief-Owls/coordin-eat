const nodeMailer = require('nodemailer')
const router = require('express').Router()
const { User } = require('../db/models')
const { isTripOwner } = require('../auth/gatekeepers')
const Promise = require('bluebird')

module.exports = router

let transporter

if (process.env.NODE_ENV === 'development') {	
	transporter = nodeMailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})
} else {
	transporter = nodeMailer.createTransport({
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})
}

router.post('/invite', isTripOwner, (req, res, next) => { //just using post because it allows request to have a body
	const domain = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : 'http://coordin-Eat.herokuapp.com'
	const url = `${domain}/trip/${req.body.trip.id}`
	
	User.findById(req.user.id)
		.then(user => {
			//Won't send yourself an email.
			let inviteesArray = req.body.invitees.filter(invitee => invitee !== req.user.id)
			return Promise.map(inviteesArray, inviteeId => {
				return User.findById(inviteeId)
					.then(invitee => {
						sendMail(url, user.name, invitee.email, req.body.trip)
					})
			})
		})
		.then(() => res.sendStatus(200))
		.catch(next)
})

function sendMail(url, senderName, recipient, trip, callback) {
	transporter.sendMail({
		from: 'coordinEat.noreply@gmail.com',
		to: recipient,
		subject: senderName + ' has invited you!',
		text: 'Use this link to accept or decline: ' + url,
		html: `${senderName} has invited you on their ${trip.name} trip!<br />
		It's scheduled for ${trip.readableDate} at ${trip.time}.<br />
		<p>Use this link to accept or decline: <a href="${url}">${url}</a></p>`
	}, callback)
}

