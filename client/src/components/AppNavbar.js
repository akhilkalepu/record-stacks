import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
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
              </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;