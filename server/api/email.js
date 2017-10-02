const nodeMailer = require('nodemailer')
const router = require('express').Router()

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
	const url = 'http://localhost:8080/trips/' + req.body.tripName //or 'http://coordin-Eat.herokuapp.com/trips/ + req.body.tripName
	transporter.sendMail({
		from: 'noreply@coordin-eat.com',
		to: req.body.attendees,
		subject: req.body.tripOwner + ' has invited you',
		text: 'Use this link to accept or decline: ' + url,
		html: `<p>Use this link to accept or decline: <a href="${url}">${url}</a></p>`
	}, ()=> res.sendStatus(200))
})
