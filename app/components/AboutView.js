/**
 * Created by Felix on 1/8/16.
 */
import React from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Glyphicon
} from 'react-bootstrap';

class AboutView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      phoneNumbers: props.phoneNumbers
    };
  }
  init() {

  }
  componentWillMount() {
    this.router = this.context.router;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
    this.init();
  }
  addField() {
    // modify the array to add a new entry
    var currentPhoneNumbers = this.state.phoneNumbers;
    currentPhoneNumbers.push("");
    this.setState({
      phoneNumbers: currentPhoneNumbers
    });
  }
  removeField(index) {
    var currentPhoneNumbers = this.state.phoneNumbers;
    currentPhoneNumbers.splice(index,1);
    this.setState({
      phoneNumbers: currentPhoneNumbers
    });
  }

    sendMessage() {
    // modify the array to add a new entry
    var currentPhoneNumbers = this.state.phoneNumbers;
    console.log("Send Message");
    console.log(currentPhoneNumbers);
    this.setState({
      
    });
  }

  handleChange(e) {
    var currentPhoneNumbers = this.state.phoneNumbers;
    currentPhoneNumbers[e.target.name] = e.target.value;
    this.setState({
      phoneNumbers: currentPhoneNumbers
    });
  }


  saveMessage(e) {
    var currentMessage = e.target.value;
    this.setState({
      message: currentMessage
    });
  }

  render(){
    console.log(this.state.phoneNumbers);
    console.log(this.state.message);
    var phoneInputs = this.state.phoneNumbers.map((input, index) =>

      <Input key={index}
             name={index}
             type="text"
             placeholder="Enter phone number"
             value={input}
             onChange={this.handleChange.bind(this)}
             buttonAfter={<Button onClick={this.removeField.bind(this, index)} bsStyle="danger"><Glyphicon glyph="remove"/></Button>}
      />
    );

    var messageInput = (<Input type='text' 
                         onChange={this.saveMessage.bind(this)}
                         placeholder='Enter message'/>);

    return (
      <div>
        <h2>Add Phone Numbers</h2>

        <div className="phone-inputs">
          { phoneInputs }
        </div>
        { messageInput}
        <Button onClick={this.addField.bind(this)} bsStyle="info">Add Phone Number</Button>

        <Button onClick={this.sendMessage.bind(this)} bsStyle="info">Send Message</Button>
      </div>
    )
  }
};

AboutView.propTypes = {
  phoneNumbers: React.PropTypes.array,
 message: React.PropTypes.string
};

AboutView.defaultProps = {
  phoneNumbers: [],
 message: ""
};

AboutView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AboutView;