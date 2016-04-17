import React from 'react';
import Header from './Header';
import Firebase from 'firebase'
import { RouteHandler } from 'react-router';
import {
  Col,
  Row

} from 'react-bootstrap';

const SESSION_EXPIRE_TIME = 60 * 60 * 1000; // currently set to 1 hour

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
    var storedExpiration = localStorage.getItem('sessionExpiration');
    var storedUser = localStorage.getItem('sessionUser');
    var currentTime = Number(Date.now());
    if (storedExpiration && storedUser) {
      if (currentTime - storedExpiration > SESSION_EXPIRE_TIME) {
        this.linkSessionToFirebase('kill');
      } else {
        this.linkSessionToFirebase(storedUser);
      }
    }
  }

  linkSessionToFirebase(sessionUser) {
    if (sessionUser == 'kill') {
      localStorage.clear();
      this.setState({
        loggedInUser: "",
        userDataObject: {}
      });
    } else {
      localStorage.setItem('sessionUser', sessionUser);
      var expireTime = Number(Date.now()) + SESSION_EXPIRE_TIME;
      localStorage.setItem('sessionExpiration', expireTime);

      this.setupFirebaseConnections(sessionUser);

    }
  }
  setupFirebaseConnections(sessionUser) {
    var usersRef = new Firebase('https://ece-590.firebaseio.com/users/' + sessionUser);
    usersRef.on('value', function(dataSnapshot) {
      this.setState({
        userDataObject: dataSnapshot.val(),
        loggedInUser: sessionUser
      }, function() {
        var router = this.context.router;
        router.transitionTo('/groups', {});
      }.bind(this));
    }.bind(this));
  }
  componentWillMount() {
    this.router = this.context.router;
    this.init();
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {

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
            this.linkSessionToFirebase(Object.keys(snap.val())[0]);
          } else {
            window.alert('Login failed.');
          }
        }
      }.bind(this));
  }

  logout() {
    this.linkSessionToFirebase('kill');
    var router = this.context.router;
    router.transitionTo('/', {});
  }

  register(username, password) {
    if (username=="kill") {
      window.alert('This username is already taken.');
      return;
    }

    new Firebase("https://ece-590.firebaseio.com/users").orderByChild("username")
      .startAt(username)
      .endAt(username)
      .once('value', function(snap) {
        if (snap.val() == null) {
          console.log("username was not found, it's okay to register");

          // TODO: Push a new user key

        } else {
          window.alert('This username is already taken.');
        }
      }.bind(this));

  }

  render() {
    return (
      <div className="main-container">
        <Header logout={this.state.logout} loggedInUser={this.state.userDataObject["username"] || ''}/>
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