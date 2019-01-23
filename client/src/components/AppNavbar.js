import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      redirectTo: null
    };
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
      this.getUser()
  }

  updateUser(userObject) {
      this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
            loggedIn: true,
            loggedOut: false,
            username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
            loggedIn: false,
            loggedOut: true,
            username: null
        })
      }
    })
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
        // this.setState({
        //   redirectTo: '/signup'
        // })
      }
    }).catch(error => {
      console.log('Logout error')
    })
    this.setState({
      redirectTo: '/login'
    })
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  render() {
    console.log('navbar render, props: ')
    console.log(this.props);

    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    }

    return (
      <div>
        <Navbar color="dark" dark expand="sm" fixed={`top`} className="mb-5">
          <Container>
            <NavbarBrand href="/">record stacks</NavbarBrand>
            
            {/* greet user if logged in: */}
            {this.state.loggedIn &&
              <NavbarBrand href="/">|</NavbarBrand>
            }
            {/* greet user if logged in: */}
            {this.state.loggedIn &&
              <NavbarBrand href="/">{this.state.username}</NavbarBrand>
            }
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
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="dropdownMenu">
                  <DropdownToggle caret>
                    account
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.loggedOut &&
                    <DropdownItem href="/login">
                      login
                    </DropdownItem>
                    }
                    {this.state.loggedOut &&
                    <DropdownItem href="/signup">
                      sign up
                    </DropdownItem>
                    }
                    {this.state.loggedIn &&
                      <DropdownItem href="/#" onClick={this.logout}>
                        log out
                      </DropdownItem>
                    }
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