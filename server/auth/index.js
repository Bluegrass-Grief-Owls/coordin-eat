const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
	User.findOne({where: {email: req.body.email}, include: [{model: User, as: 'friend', attributes: ['id', 'name', 'favoriteFood']}]})
		.then(user => {
			if (!user) {
				res.status(401).send('User not found')
			} else if (!user.correctPassword(req.body.password)) {
				res.status(401).send('Incorrect password')
			} else {
				//Returns user info, but not the password or salt 
				req.login(user, err => err ? next(err) : res.json({id: user.id, email: user.name, name: user.name, favoriteFood: user.favoriteFood, friend: user.friend}))
			}
		})
		.catch(next)
})

router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then(user => {
			req.login(user, err => err ? next(err) : res.json(user))
		})
		.catch(err => {
			if (err.name === 'SequelizeUniqueConstraintError')
				res.status(401).send('User already exists')
			else next(err)
		})
})

router.post('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/me', (req, res, next) => {
	if(req.user){
		User.findOne({where: {id: req.user.id}, include: [{model: User, as: 'friend', attributes: ['id', 'name', 'favoriteFood']}], attributes: ['id', 'email', 'name', 'favoriteFood']})
			.then(user =>{
				res.json(user)
			})
			.catch(next)
	} else {
		res.json({name: 'not logged in'})
	}
})

router.use('/google', require('./google'))
