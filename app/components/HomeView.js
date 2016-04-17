import React from 'react';
import {
Alert,
  Col,
Row,
  Jumbotron,
  Input,
Image,
Button,
Modal,
Table,
Well,
ButtonToolbar,
ButtonGroup
} from 'react-bootstrap';


class HomeView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      actionType: props.actionType,
      alertVisible: props.alertVisible,
      alertMessage: props.alertMessage
    };
  }

  componentWillMount() {
    if (this.props.loggedInUser != "") {
      var router = this.context.router;
      router.transitionTo('/groups', {});
    }
  }
  componentWillUnmount() {

  }
  changeActionType(newAction) {
    this.setState({
      actionType: newAction
    });
  }
  processLogin() {
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();

    if (username == "" || password == "") {
      this.handleAlertShow("Please fill in all fields.");
      return;
    }

    if (this.state.actionType=="register") {
      this.props.register(username, password);
    } else {
      this.props.login(username, password);
    }

  }
  handleAlertDismiss() {
    this.setState({
      alertVisible: false
    });
  }
  handleAlertShow(message) {
    this.setState({
      alertMessage: message,
      alertVisible: true
    });
  }
  render(){
    console.log(this.props);
    var alert = <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
      {this.state.alertMessage}
    </Alert>

    return (
      <div className="page-center-all">
        <br />

        <Jumbotron className="jumbotron-main">
          <h1>Group Texting</h1>

          <br />
          <p>Welcome to the Group Texting website, made by Felix Xiao and Oscar Wang. Please <b>login</b> or <b>register</b> below to get started.</p>
          <br />


          { this.state.alertVisible ? alert : <div></div>}
          <ButtonGroup justified>
            <ButtonGroup>
              <Button onClick={this.changeActionType.bind(this,"login")} bsStyle={this.state.actionType == "login" ? "success" : "default"}>Login</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={this.changeActionType.bind(this,"register")} bsStyle={this.state.actionType == "register" ? "success" : "default"}>Register</Button>
            </ButtonGroup>
          </ButtonGroup>
          <br />
          <Input className="page-center-all" ref="username" type="text" placeholder="Username" />
          <Input className="page-center-all" ref="password" type="password" placeholder="Password" />

          <Button onClick={this.processLogin.bind(this)} block bsStyle="primary">Submit</Button>

        </Jumbotron>


      
      </div>
    )
  }
};



HomeView.propTypes = {
  actionType: React.PropTypes.string,
  alertVisible: React.PropTypes.bool,
  alertMessage: React.PropTypes.string
};

HomeView.defaultProps = {
  actionType: "login",
  alertVisible: false,
  alertMessage: ""
};

HomeView.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default HomeView;