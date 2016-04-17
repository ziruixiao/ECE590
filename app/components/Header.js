import React from 'react';
import { Button, Glyphicon, Input, Nav, Navbar, Image, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Header extends React.Component{
  render () {

    var loggedInNav = <Nav onSelect={handleSelect.bind(this)} pullRight>
      <NavItem href='#'>{this.props.loggedInUser}</NavItem>
      <NavItem href='#' eventKey={6}>Logout</NavItem>
    </Nav>;

    return (
      <div>
        <Navbar fixedTop>

          <Navbar.Header>

            <Navbar.Brand>
              <a href='#'>Group Texting</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onSelect={handleSelect.bind(this)}>
              <NavItem href='#' eventKey={2}>About</NavItem>
              <NavItem href='#' eventKey={3}>Terms of Use</NavItem>
              <NavItem href='#' eventKey={4}>Privacy</NavItem>
              <NavItem href='#' eventKey={5}>Contact</NavItem>
            </Nav>
            {this.props.loggedInUser != "" ? loggedInNav : <div></div>}
          </Navbar.Collapse>
        </Navbar>
        
      </div>
    )
  }
};

function handleSelect(selectedKey) {
  var router = this.context.router;
  if (selectedKey == 1) {
    router.transitionTo('/', {});
  } else if (selectedKey == 2) {
    router.transitionTo('about',{});
  } else if (selectedKey == 3) {
    router.transitionTo('terms',{});
  } else if (selectedKey == 4) {
    router.transitionTo('privacy',{});
  } else if (selectedKey == 5) {
    router.transitionTo('contact',{});
  } else if (selectedKey == 6) {
    this.props.logout();
  }
}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;