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
Table
} from 'react-bootstrap';

var PhoneTextField = React.createClass({
  getInitialState: function() {
    return {value: this.props.placeholder};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
});

class HomeView extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

  }
  componentWillUnmount() {

  }



  render(){
    var myUser = this.props.loggedInUser;
    var myButton = <Button>Empty Button</Button>;

    if (myUser == "Oscar") {
      myButton = <Button bsStyle="primary">Oscar: Add Phone Number</Button>;
    } else {
      myButton = <Button bsStyle="primary">Not Oscar: Add Phone Number</Button>;
    }
    return (
      <div className="page-center-all">
        <br />
        <br />


      {myButton} 
      <br /> 
      <br />
      <PhoneTextField placeholder="First phone number"/>
      
      </div>
    )
  }
};



HomeView.propTypes = {
};

HomeView.defaultProps = {
};

HomeView.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default HomeView;