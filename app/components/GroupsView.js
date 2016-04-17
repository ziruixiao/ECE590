/**
 * Created by Felix on 1/8/16.
 */
import React from 'react';
import {
  Col,
  Input,
  Button,
Jumbotron,
Glyphicon,
Panel,
Row
} from 'react-bootstrap';

class GroupsView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      message: props.message
    };
  }
  componentWillMount() {
    this.router = this.context.router;
    this.init();
  }
  init() {

  }
  addNewGroup() {
    var router = this.context.router;
    router.transitionTo('edit', {groupId: '-1'});
  }
  saveMessage(e) {
    var currentMessage = e.target.value;
    this.setState({
      message: currentMessage
    });
  }
  sendMessage() {
    // modify the array to add a new entry
    /*
    var currentPhoneNumbers = this.state.phoneNumbers;
    var currentMessage = this.state.message;
    console.log("Send Message");
    console.log(currentMessage);
    console.log(currentPhoneNumbers);

    currentPhoneNumbers.map((phoneNumber, index) => {
      var datahash = {};
      datahash["text[tonumber]"] = "+1" + phoneNumber.replace(/\D/g,'');
      datahash["text[fromnumber]"] = '+14694163155';
      datahash["text[message]"] = currentMessage;
      var $ = require ('jquery')
      $.ajax({
        type: "POST",
        url: 'http://ece590twilio.herokuapp.com/texts',
        data: datahash,
        dataType: 'json'
      });
    });*/


  }
  render(){

    var groupTiles = this.props.userDataObject ? this.props.userDataObject["groups"] ? Object.keys(this.props.userDataObject["groups"]).map((key)=>
      <Col className="group-display-column" key={key} xs={6}>
        <Panel header={this.props.userDataObject["groups"][key]["name"]} bsStyle="default">
          Panel content
        </Panel>
      </Col>
    ) : <div></div> : <div></div>;

    var messageInput = (<Input type='text'
                               onChange={this.saveMessage.bind(this)}
                               placeholder='Enter message'/>);
    return (
      <div className="page-center-all">
        <br />

        <Jumbotron className="jumbotron-main">
          <h2>My Groups</h2>

          <br />
          <Col xs={12}>
            <Button className="group-display-column-inner" onClick={this.addNewGroup.bind(this)} bsStyle="info" bsSize="medium" block justified><Glyphicon glyph="plus" />{ ' ' }New Group</Button>
          </Col>
          <br /><br /><br />
          {groupTiles}
          { messageInput}
          <br />
          <Button onClick={this.sendMessage.bind(this)} bsStyle="info">Send Message</Button>


        </Jumbotron>



      </div>
    )
  }
};

GroupsView.propTypes = {
  message: React.PropTypes.string
};

GroupsView.defaultProps = {
  message: ""
};


GroupsView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default GroupsView;