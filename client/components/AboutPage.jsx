import React, { Component } from 'react'
import { Col, Row, PageHeader } from 'react-bootstrap'

export default () => {
	return (
		<Row className=''>
			<PageHeader className='noMargin welcomeUser'>Welcome to Coordin-EAT!</PageHeader>
			<Row>
				<Col xs={12} className='noPaddingLeft noPaddingRight'>
					<h3>About the App</h3>
					<p>Coordin-eat is a mobile-first web app to ease the pain of finding the perfect spot for dinner with your geographically inconvenient friends. </p>
					<p>The code can be found on Github <a href="https://github.com/Bluegrass-Grief-Owls/coordin-eat/">here</a></p>
					<h3>The Team</h3>
					<p>Coordin-Eat was created by the Bluegrass Grief Owls capstone team at <a href="fullstackacademy.com">Fullstack Academy</a>: <a href="https://www.linkedin.com/in/sam-glass">Sam Glass</a>, <a href="https://www.linkedin.com/in/dgaberger">David Berger</a>, <a href="https://www.linkedin.com/in/jackson-sui">Jackson Sui</a>, and <a href="https://www.linkedin.com/in/forrest-wolf/">Forrest Weiswolf.</a></p>
				</Col>
			</Row>
		</Row>
	)
}