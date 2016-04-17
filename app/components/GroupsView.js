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

import * as twilioActions from '../twilioActions';

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

    this.state.activeGroups.map((input, index) => {

      var iterateGroup = this.props.userDataObject["groups"][input]["numbers"];
      iterateGroup.map((input2, index2) => {
        twilioActions.sendMessage(this.state.message, input2);
      });

    });
    this.setState({
      activeGroups: [],
      message: ""
    });



  }
  render(){

    var groupTiles = this.props.userDataObject ? this.props.userDataObject["groups"] ? Object.keys(this.props.userDataObject["groups"]).map((key)=>
      <Col className="group-display-column" key={key} xs={12} sm={6}>

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
                               value={this.state.message}
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