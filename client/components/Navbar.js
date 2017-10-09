import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link} from 'react-router-dom'

const navbarInstance = (props) => {
	const {isLoggedIn, handleClick} = props
	console.log(isLoggedIn)

	return (
		<Navbar collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand className="noMargin">
					<Link to="/home">React-Bootstrap</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			{
				isLoggedIn
					? <div>
						<Navbar.Collapse>
							<Nav>
								<NavItem eventKey={1}>
									<a className='noMargin noPadding' href='#' onClick={handleClick}>Logout</a>
								</NavItem>
								<NavItem eventKey={1}>
									<Link className='noMargin noPadding' to='/build_trip'>Build a Trip</Link>
								</NavItem>
								<NavItem eventKey={1}>
									<Link className='noMargin noPadding' to='/friends'>Friends</Link>
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

// <Link className='linkOnNav' to='/home'><h1 className='noMargin marginLeft15'>Coordin-EAT</h1></Link>
// 				<nav>
// 					{
// 						isLoggedIn
// 							? <div>
// 								{/* The navbar will show these links after you log in */}
// 								<a className='linkOnNav fontMainColor' href='#' onClick={handleClick}>Logout</a>
// 								<Link className='linkOnNav' to='/build_trip'>Build a Trip</Link>
// 								<Link className='linkOnNav' to='/friends'>Friends</Link>
// 							</div>
// 							: <div>
// 								{/* The navbar will show these links before you log in */}
// 								<Link className='linkOnNav' to='/login'>Login</Link>
// 								<Link className='linkOnNav' to='/signup'>Sign Up</Link>
// 							</div>
// 					}
// 				</nav>
