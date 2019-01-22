import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

class AppNavbar extends Component {

  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);

    return (
      <div>
        <Navbar color="dark" dark expand="sm" fixed={`top`} className="mb-5">
          <Container>
            <NavbarBrand href="/">record stacks</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/inputform">
                    input
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/graphpage">
                    graph page
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/theinfamousAK/record-stacks" target="_blank">
                    github
                  </NavLink>
                </NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    login / sign out
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/login">
                      sign up
                    </DropdownItem>
                    <DropdownItem href="/signup">
                      login
                    </DropdownItem>
                    <DropdownItem href="/#" onClick={this.logout}>
                      sign out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;