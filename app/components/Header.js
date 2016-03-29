import React from 'react';
import { Button, Glyphicon, Input, Nav, Navbar, Image, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Header extends React.Component{
  render () {
    var myUser = this.props.loggedInUser;
    var myButton = <Button>Empty Button</Button>;
    if (myUser == "Oscar") {
      myButton = <Button bsStyle="info">The user is Oscar</Button>;
    } else {
      myButton = <Button bsStyle="danger">The user is not Oscar</Button>;
    }

    return (
      <div>
        <Navbar fixedTop>

          <Navbar.Header>

            <Navbar.Brand>
              <a href='#'>{this.props.loggedInUser}</a>
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
        {myButton}
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