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
Row,
ButtonGroup
} from 'react-bootstrap';

class GroupsView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      activeGroups: props.activeGroups
    };
  }
  componentWillMount() {
    this.router = this.context.router;
    this.init();
  }
  init() {

  }
  goToEditPage(editId) {
    var router = this.context.router;
    router.transitionTo('edit', {groupId: editId});
  }
  saveMessage(e) {
    var currentMessage = e.target.value;
    this.setState({
      message: currentMessage
    });
  }

  selectGroup(groupId, shouldAdd) {
    var copiedArray = this.state.activeGroups;
    var index = copiedArray.indexOf(groupId);
    if (index >= 0) {
      copiedArray.splice(index, 1);
    }
    if (shouldAdd) {
      copiedArray.push(groupId);
    }
    this.setState({
      activeGroups: copiedArray
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
    console.log(this.state);

    var groupTiles = this.props.userDataObject ? this.props.userDataObject["groups"] ? Object.keys(this.props.userDataObject["groups"]).map((key)=>
      <Col className="group-display-column" key={key} xs={6}>

        <Panel header={this.props.userDataObject["groups"][key]["name"]} bsStyle={

        this.state.activeGroups.indexOf(key) >= 0 ? "success" : "default"
        } footer={<ButtonGroup justified>
            <ButtonGroup>
             <Button onClick={this.goToEditPage.bind(this,key)} bsSize="small" bsStyle="warning"><Glyphicon glyph="edit" /></Button>
            </ButtonGroup>
            <ButtonGroup>
            {
              this.state.activeGroups.indexOf(key) >= 0 ?
              <Button onClick={this.selectGroup.bind(this,key,false)} bsSize="small" bsStyle="danger">Unselect</Button> :
              <Button onClick={this.selectGroup.bind(this,key,true)} bsSize="small" bsStyle="success">Select</Button>
            }

            </ButtonGroup>
        </ButtonGroup>}>
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
            <Button className="group-display-column-inner" onClick={this.goToEditPage.bind(this,-1)} bsStyle="info" block justified><Glyphicon glyph="plus" />{ ' ' }New Group</Button>
          </Col>
          <br /><br /><br />
          {groupTiles}
          { messageInput}
          <br />
          <Button onClick={this.sendMessage.bind(this)} bsStyle="info">Send Message</Button>


        </Jumbotron>
        <br />
        <br />


      </div>
    )
  }
};

GroupsView.propTypes = {
  message: React.PropTypes.string,
  activeGroups: React.PropTypes.array
};

GroupsView.defaultProps = {
  message: "",
  activeGroups: []
};


GroupsView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default GroupsView;