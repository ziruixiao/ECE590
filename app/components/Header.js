import React from 'react';
import { Glyphicon, Input, Nav, Navbar, Image, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Header extends React.Component{
  render () {
    return (
      <div>
        <Navbar fixedTop>

          <Navbar.Header>

            <Navbar.Brand>
              <a href='#'>ECE590</a>
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
  }
}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;