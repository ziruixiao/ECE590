import React from 'react';
import Header from './Header';
import Firebase from 'firebase'
import { RouteHandler } from 'react-router';
import {
  Col,
  Row

} from 'react-bootstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: props.loggedInUser,
      userDataObject: props.userDataObject,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      register: this.register.bind(this)
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

  login(username, password) {
    new Firebase("https://ece-590.firebaseio.com/users").orderByChild("username")
      .startAt(username)
      .endAt(username)
      .once('value', function(snap) {
        if (snap.val() == null) {
          window.alert('Login failed.');
        } else {
          var tempObject = snap.val()[Object.keys(snap.val())[0]];
          if (tempObject["password"] == password) {
            this.setState({
              loggedInUser: tempObject["username"],
              userDataObject: tempObject
            }, function() {
              var router = this.context.router;
              router.transitionTo('/groups', {});
            }.bind(this));
          } else {
            window.alert('Login failed.');
          }
        }
      }.bind(this));
  }

  logout() {

  }

  register(username, password) {
    new Firebase("https://ece-590.firebaseio.com/users").orderByChild("username")
      .startAt(username)
      .endAt(username)
      .once('value', function(snap) {
        if (snap.val() == null) {
          console.log("username was not found, it's okay to register");

          // TODO: Push a new user key

        } else {
          window.alert('This username is already taken.')
        }
      }.bind(this));

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
  loggedInUser: React.PropTypes.string,
  userDataObject: React.PropTypes.object,
  login: React.PropTypes.func,
  logout: React.PropTypes.func,
  register: React.PropTypes.func

};

Main.defaultProps = {
  loggedInUser: "",
  userDataObject: {},
  login: (username,password) => {},
  logout: () => {},
  register: (username,password) => {}
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;