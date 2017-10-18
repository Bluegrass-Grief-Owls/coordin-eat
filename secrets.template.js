process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'

process.env.YELP_ACCESS_TOKEN = ''

if (process.env.NODE_ENV === 'development') {
	process.env.MAIL_HOST = 'mailtrap.io'
	process.env.MAIL_PORT = ''
	process.env.MAIL_USER = ''
	process.env.MAIL_PASS = ''
} else {
	process.env.MAIL_SERVICE = 'Gmail'
	process.env.MAIL_USER = ''
	process.env.MAIL_PASS = ''    
}


process.env.GOOGLE_DIRECTIONS_KEY_1 = ''
process.env.GOOGLE_DIRECTIONS_KEY_2 = ''
process.env.GOOGLE_DIRECTIONS_KEY_3 = ''
process.env.GOOGLE_DIRECTIONS_KEY_4 = ''
process.env.GOOGLE_DIRECTIONS_KEY_5 = ''
process.env.GOOGLE_DIRECTIONS_KEY_6 = ''
process.env.GOOGLE_DIRECTIONS_KEY_7 = ''
process.env.GOOGLE_DIRECTIONS_KEY_8 = ''
process.env.GOOGLE_DIRECTIONS_KEY_9 = ''
process.env.GOOGLE_DIRECTIONS_KEY_10 = ''

module.exports = {
	test_map_key: ''
}