const nodeMailer = require('nodemailer')
const router = require('express').Router()
const {User} = require('../db/models')

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
	if(req.body.tripName.match(/^[a-z0-9]+$/i)){ //check that the name is alphanumeric
		const url = 'http://localhost:8080/trips/' + req.body.tripName //or 'http://coordin-Eat.herokuapp.com/trips/ + req.body.tripName
		User.findById(req.body.user.id)
			.then(user => {
				sendMail(url, user.name, req.body.attendees, () => res.sendStatus(200))
			})
	} else {
		res.sendStatus(403)
	}
})

function sendMail(url, senderName, recipients, callback){
	transporter.sendMail({
		from: 'noreply@coordin-eat.com',
		to: recipients,
		subject: senderName + ' has invited you',
		text: 'Use this link to accept or decline: ' + url,
		html: `<p>Use this link to accept or decline: <a href="${url}">${url}</a></p>`
	}, callback)
}