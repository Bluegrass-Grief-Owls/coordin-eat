import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
		this.handleAnyClick = this.handleAnyClick.bind(this)
	}

	navExpand(exp) {
		this.setState({ navToggle: exp })
	}
	navClose() {
		this.setState({ navToggle: false })
	}

	setWrapperRef(node) {
		this.wrapperRef = node
	}

	handleAnyClick(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({ navToggle: false })
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isLoggedIn: nextProps.isLoggedIn })
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleAnyClick)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleAnyClick)
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn
		const handleClick = this.state.handleClick

		return (
			<Navbar collapseOnSelect fixedTop={true} className="noMargin"
				expanded={this.state.navToggle}
				onToggle={this.navExpand}>
				<Navbar.Header>
					<Navbar.Brand className="noMargin">
						<Link to="/home" className='navTitle'>Coordin-EAT</Link>
					</Navbar.Brand>
					<div ref={this.setWrapperRef}>
						<Navbar.Toggle />
					</div>
				</Navbar.Header>
				{
					isLoggedIn
						? <div>
							<Navbar.Collapse className='noPadding'>
								<Nav onSelect={this.navClose}>
									<NavItem eventKey={1}>
										<Link to='/about'><h4 className="fontMainColor displayInline">About Coordin-EAT</h4></Link>
									</NavItem>
									<NavItem eventKey={2}>
										<Link to='/build_trip'><h4 className="fontMainColor displayInline">Build a Trip</h4></Link>
									</NavItem>
									<NavItem eventKey={3}>
										<Link to='/friends'><h4 className="fontMainColor displayInline">Friends</h4></Link>
									</NavItem>
									<NavItem eventKey={4}>
										<Link to='/profile'><h4 className="fontMainColor displayInline">Profile</h4></Link>
									</NavItem>
									<NavItem eventKey={5}>
										<a href='#' onClick={handleClick}><h4 className="fontMainColor displayInline">Logout</h4></a>
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</div>
						: <div>
							<Navbar.Collapse className='noPadding' onSelect={this.navClose}>
								<Nav onSelect={this.navClose}>
									<NavItem eventKey={1}>
										<Link to='/about'><h4 className="fontMainColor displayInline">About Coordin-EAT</h4></Link>
									</NavItem>
									<NavItem eventKey={2}>
										<Link to='/login'><h4 className="fontMainColor displayInline">Login</h4></Link>
									</NavItem>
									<NavItem eventKey={3}>
										<Link to='/signup'><h4 className="fontMainColor displayInline">Sign-up</h4></Link>
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</div>
				}
			</Navbar>
		)
	}
}