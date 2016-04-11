import React from 'react';
import Header from './Header';

import { RouteHandler } from 'react-router';
import {
  Col,
  Row

} from 'react-bootstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: props.loggedInUser
    };
  }

  init() {
  }
  componentWillMount() {
    this.router = this.context.router;
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
    this.init();
  }

  render() {
    return (
      <div className="main-container">
        <Header loggedInUser={this.state.loggedInUser}/>
        <br />
        <br />
        <br />
        <div className="container">
          <RouteHandler {...this.state} />
        </div>
        <Row>
          <Col className="hidden-sm hidden-md hidden-lg">
            <br />
            <br />
            <br />
            <br />
          </Col>
          <Col className="hidden-xs hidden-md hidden-lg">
            <br />
            <br />
          </Col>
        </Row>

      </div>
    )
  }
};


Main.propTypes = {
  loggedInUser: React.PropTypes.string
};

Main.defaultProps = {
  loggedInUser: "notOscar"
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;