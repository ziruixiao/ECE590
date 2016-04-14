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
      actionType: props.actionType
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
  render(){


    return (
      <div className="page-center-all">
        <br />

        <Jumbotron className="jumbotron-main">
          <h1>Group Texting</h1>

          <br />
          <p>Welcome to the Group Texting website, made by Felix Xiao and Oscar Wang. Please <b>login</b> or <b>register</b> below to get started.</p>
          <br />

          <ButtonGroup justified>
            <ButtonGroup>
              <Button>Login</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>Register</Button>
            </ButtonGroup>
          </ButtonGroup>
          <br />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />

          <Button block bsStyle="primary">Submit</Button>

        </Jumbotron>


      
      </div>
    )
  }
};



HomeView.propTypes = {
  actionType: React.PropTypes.string
};

HomeView.defaultProps = {
  actionType: "login"
};

HomeView.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default HomeView;