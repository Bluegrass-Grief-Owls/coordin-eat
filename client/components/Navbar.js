import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { Link} from 'react-router-dom'

export default class navbarInstance extends Component {
	constructor(props) {
		super(props)
		this.state = {
			navToggle: false,
			isLoggedIn: props.isLoggedIn,
			handleClick: props.handleClick
		}

		this.navExpand = this.navExpand.bind(this)
		this.navClose = this.navClose.bind(this)

		this.setWrapperRef = this.setWrapperRef.bind(this)         
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	navExpand (exp) {
		this.setState({navToggle: exp})
	}
	navClose () {
		this.setState({navToggle: false})
	}

	setWrapperRef (node) {
		this.wrapperRef = node
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({navToggle: false})
		}
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	render () {
		const isLoggedIn = this.state.isLoggedIn
		const handleClick = this.state.handleClick
		console.log('state', this.state)

		return (
			<div ref={this.setWrapperRef}>
				<Navbar collapseOnSelect fixedTop={true} className="noMargin" 
					expanded={this.state.navToggle}
					onToggle={this.navExpand}>
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
									<Nav onSelect={this.navClose}>
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
								<Navbar.Collapse className='noPadding' onSelect={this.navClose}>
									<Nav onSelect={this.navClose}>
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
			</div>
		)	
	}
}