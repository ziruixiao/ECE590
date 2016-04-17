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
  } else if (selectedKey == 6) {
    this.props.logout();
  }
}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;