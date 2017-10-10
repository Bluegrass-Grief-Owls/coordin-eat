import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link} from 'react-router-dom'

const navbarInstance = (props) => {
	const {isLoggedIn, handleClick} = props

	return (
		<Navbar collapseOnSelect fixedTop={true} className="noMargin">
			<Navbar.Header>
				<Navbar.Brand className="noMargin">
					<Link to="/home" className='navTitle'>Coordin-EAT</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			{
				isLoggedIn
					? <div>
						<Navbar.Collapse className='noPadding'>
							<Nav>
								<NavItem eventKey={1}>
									<Link to='/build_trip'><h4 className="fontMainColor displayInline">Build a Trip</h4></Link>
								</NavItem>
								<NavItem eventKey={2}>
									<Link to='/friends'><h4 className="fontMainColor displayInline">Friends</h4></Link>
								</NavItem>
								<NavItem eventKey={3}>
									<Link to='/profile'><h4 className="fontMainColor displayInline">Profile</h4></Link>
								</NavItem>
								<NavItem eventKey={4}>
									<a href='#' onClick={handleClick}><h4 className="fontMainColor displayInline">Logout</h4></a>
								</NavItem>															
							</Nav>
						</Navbar.Collapse>
					</div>
					: <div>
						<Navbar.Collapse className='noPadding'>
							<Nav>
								<NavItem eventKey={1}>
									<Link to='/login'><h4 className="fontMainColor displayInline">Login</h4></Link>
								</NavItem>
								<NavItem eventKey={2}>
									<Link to='/signup'><h4 className="fontMainColor displayInline">Sign-up</h4></Link>
								</NavItem>
							</Nav>
						</Navbar.Collapse>
					</div>
			}
		</Navbar>
	)
}

export default navbarInstance