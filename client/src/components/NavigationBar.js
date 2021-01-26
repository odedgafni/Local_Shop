import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Nav, Navbar,
  NavbarBrand, NavbarToggler, NavItem,
  NavLink, UncontrolledDropdown
} from 'reactstrap';

import { useSelector, useDispatch } from "react-redux"
import { logOut } from '../redux/actions/userActions'

const NavigationBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(state => state.userAuth.user);
  const { cart } = useSelector(state => state.shoppingCart);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  }

  const toggleState = () => {
    setIsOpen(!isOpen);
  }

  const regex = /^\w+/i
  const userFirstName = user && user.name && user.name.match(regex) 

  return (
    <Router>
      <Navbar dark expand="sm" fixed="top" color="dark">
        <NavbarBrand style={{ color: "white" }}>Local Shop</NavbarBrand>
        <NavbarToggler onClick={toggleState} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-1" navbar>
            <NavItem>
              <NavLink href="/"><i className="fas fa-home"></i>Home</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-1" navbar>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-1" navbar>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            {user && user.name &&
              <Nav className="mr-1" navbar>
                <NavItem>
                  <NavLink href="/cart"><i className="fas fa-shopping-cart"></i> Your Cart {""}
                    {cart && cart.totalCart &&
                      <span className="badge badge-warning">{cart.totalCart.totalQty}</span>}
                  </NavLink>
                </NavItem>
              </Nav>
            }
            {user && user.name ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret><i className="fas fa-user"></i> {userFirstName}</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="text-dark" href="/user/info">My Account</NavLink>
                    </NavItem>
                  </DropdownItem>
                  {user && user.isAdmin &&
                    <DropdownItem>
                      <NavItem>
                        <NavLink href="/admin-panel"><i className="fas fa-crown"></i> Admin Panel</NavLink>
                      </NavItem>
                    </DropdownItem>
                  }
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="text-dark" href="/user/update">Update Info</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="text-dark" href="/user/recent_orders">Recent Orders</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogOut}>Log Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Sign-In / Register</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href='/login'>Sign In</DropdownItem>
                  <DropdownItem href='/register'>Register</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>}
          </Nav>
        </Collapse>
      </Navbar>
    </Router>
  )
}

export default NavigationBar;