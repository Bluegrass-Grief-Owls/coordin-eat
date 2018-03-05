import React, { Component } from 'react'
import { Col, Row, PageHeader } from 'react-bootstrap'

export default () => {
	return (
		<Row className=''>
			<PageHeader className='noMargin'>Welcome to Coordin-EAT!</PageHeader>
			<Row>
				<Col xs={12}>
					<h3>About the App</h3>
					<p>Coordin-eat is a mobile-first web app to ease the pain of finding the perfect spot for dinner with your geographically inconvenient friends.</p>
					<p> You can create a trip via the Build Trip page (rememeber to enter a time and trip name), and invite your friends on it. They will automatically be sent an email with a link to the trip page. At any point, you can go to a trip's page to see the current state of the trip. Initially, the people coming on a trip can RSVP and mark the locations they will be travelling from.</p>
					<p>Once everyone has reponded, (or if the trip owner decides they're taking too long and clicks 'proceed to voting'), Coordin-EAT will calculate an optimal meeting location, and suggest five restaurants near it. Everyone one on the trip can vote on which to go to, and when all the votes are in, the trip page will switch to showing a map and a link to directions.</p>
					<p>The code can be found on Github <a href="https://github.com/Bluegrass-Grief-Owls/coordin-eat/">here</a></p>.
					<h3>The Team</h3>
					<p>Coordin-Eat was created by the Bluegrass Grief Owls capstone team at <a href="https://fullstackacademy.com">Fullstack Academy</a>: <a href="https://www.linkedin.com/in/sam-glass">Sam Glass</a>, <a href="https://www.linkedin.com/in/dgaberger">David Berger</a>, <a href="https://www.linkedin.com/in/jackson-sui">Jackson Sui</a>, and <a href="https://www.linkedin.com/in/forrest-wolf/">Forrest Weiswolf.</a></p>
				</Col>
			</Row>
		</Row>
	)
}