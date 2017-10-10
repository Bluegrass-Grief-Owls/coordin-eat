import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link} from 'react-router-dom'

const navbarInstance = (props) => {
	const {isLoggedIn, handleClick} = props
	console.log(isLoggedIn)

	return (
		<Navbar collapseOnSelect className="noMargin">
			<Navbar.Header>
				<Navbar.Brand className="noMargin">
					<Link to="/home">Coordin-EAT</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			{
				isLoggedIn
					? <div>
						<Navbar.Collapse>
							<Nav>
								<NavItem className='noMargin noPadding' eventKey={1}>
									<a className='noMargin noPadding' href='#' onClick={handleClick}><h4 className="displayInline">Logout</h4></a>
								</NavItem>
								<NavItem className='noMargin noPadding' eventKey={1}>
									<Link className='noMargin noPadding' to='/build_trip'><h4 className="displayInline">Build a Trip</h4></Link>
								</NavItem>
								<NavItem className='noMargin noPadding' eventKey={1}>
									<Link className='noMargin noPadding' to='/friends'><h4 className="displayInline">Friends</h4></Link>
								</NavItem>																
							</Nav>
						</Navbar.Collapse>
					</div>
					: <div>
					</div>
			}
		</Navbar>
	)
}

export default navbarInstance