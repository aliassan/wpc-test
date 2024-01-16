import React, {useEffect} from "react"
import {Routes, Link, Route, useNavigate, useLocation} from "react-router-dom"
import {useStore} from '../stores/main.store'
import {useUserStore} from '../stores/user.store'
import {updateItem} from '../api/userStore.api'
import {useWeb3} from '../api/web3.api'
import {getContractInstance} from '../api/main.api'
import {loginUser, getUser, updateUserStore} from '../api/user.api'
import {
	Container,
	Navbar,
	Nav,
	NavDropdown,
	Dropdown,
	Button,
	Form
} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
	faUserCircle,
	faSignInAlt,
	faSignOutAlt
} from "@fortawesome/free-solid-svg-icons"
//import {login} from '../api/main.api'

export default function Navigation(props) {
	const {_state, _dispatch} = useUserStore()
	const web3 = useWeb3()
	let navigate = useNavigate()
	const location = useLocation()

	const onLogin = async () => {
	  loginUser(_dispatch, onAccountsChanged)
	}

	const onAccountsChanged = accounts => {
		updateUserStore(accounts[0], _dispatch)
	}

	const onCreateCourse = async () => {
		if (_state.address !== undefined) {
			navigate('/create')
		} else {
			const res = await loginUser(_dispatch, onAccountsChanged)
			if (res) {
				navigate('/create')
			} else {
				//handle login failed...
			}
		}

	}

	/*useEffect(async () => {
		if (window && window.ethereum) {
      try {
        const accounts = await ethereum.request({method: 'eth_accounts'})
				if (accounts[0]) {
      		updateUserState(accounts[0], _dispatch)
					ethereum.on('accountsChanged', onAccountsChanged)
				}
      } catch(error) {
        console.error('Error auto logging in user: ', error)
      }
    } else {
      alert('You need to have MetaMask installed to perform this action')
    }
	}, [])*/

	return(
		<>
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href='/'>DClass</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search for anything..."
							className="me-2 search"
							aria-label="Search"
							name="q"
							onKeyPress={e => {
								if (e.key === 'Enter') {
									//let paramsString = `q=${e.target.value.replaceAll(' ', '+')}`
									const searchParams = new URLSearchParams(
											[['q', e.target.value]]
										)
									if (location.pathname !== '/search') {
										//e.preventDefault()
										navigate(
											`/search?${searchParams.toString()}`
										)
									} else {
										// let searchParams = new URLSearchParams(paramsString)
										// searchParams.set()
										//e.preventDefault()
										/*navigate(
											`/search?${paramsString}`
										)*/
									}
								}
							}}
						/>
						<Button variant="outline-primary">Search</Button>
					</Form>
					<div id="nav-main__div-justify-end" className="d-flex justify-content-end">
						<Navbar.Text>
							<Button onClick={onCreateCourse}>
								Create a Course
							</Button>
						</Navbar.Text>
						<>
							{
								_state.address !== undefined && (
									<Dropdown navbar className="nav-main__dropdown-user">
										<Dropdown.Toggle>
												<FontAwesomeIcon icon={faUserCircle} size="lg" />
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item>
												{`
													${
														_state.address.substring(0,6)
													}...${
														_state.address.substring(38,42)
													}
												`}
											</Dropdown.Item>
											<NavDropdown drop="start" title="My Courses">
												<NavDropdown.Item
													onClick={() => navigate('/learning')}
												>
													I'm Learning
												</NavDropdown.Item>
												<NavDropdown.Item
													onClick={() => navigate('/teaching')}
												>
													I'm Teaching
												</NavDropdown.Item>
											</NavDropdown>
											<Dropdown.Divider />
											<Dropdown.Item
												onClick={() => navigate(`/profile/${_state.userID}`)}
											>
												Profile
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								)
							}
						</>
						<>
							{
								!_state.address && (
									<Navbar.Text>
										<Button onClick={onLogin}>
											<FontAwesomeIcon icon={faSignInAlt} size="lg" />
										</Button>
									</Navbar.Text>
								)
							}
						</>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
	)
}
