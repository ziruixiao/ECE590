/**
 * Created by Felix on 1/8/16.
 */
import React from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Glyphicon,
  Jumbotron
} from 'react-bootstrap';
import * as firebaseActions from '../firebaseActions';

class EditView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      phoneNumbers: props.phoneNumbers,
      groupName: props.groupName
    };
  }
  init() {
    var groupId = this.router.getCurrentParams().groupId;
    if (groupId != -1) { // brand new group

      if (this.props.userDataObject["groups"]) {
        var thisGroup = this.props.userDataObject["groups"][groupId];
        if (thisGroup) {
          this.setState({
            phoneNumbers: thisGroup["numbers"],
            groupName: thisGroup["name"]
          });
        }
      }

    }
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

  saveGroup() {
    var payload = {
      name: this.state.groupName,
      numbers: this.state.phoneNumbers
    }

    firebaseActions.addOrUpdateGroup(this.props.loggedInUser, this.router.getCurrentParams().groupId, payload);
  }
  handleChange(e) {
    var currentPhoneNumbers = this.state.phoneNumbers;
    currentPhoneNumbers[e.target.name] = e.target.value;
    this.setState({
      phoneNumbers: currentPhoneNumbers
    });
  }

  saveName(e) {
    var currentName = e.target.value;
    this.setState({
      groupName: currentName
    });
  }

  render(){
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
    var nameInput = (<Input type='text'
                               value={this.state.groupName} onChange={this.saveName.bind(this)}
                               placeholder='Group Name'/>);

    return (

    <div className="page-center-all">
      <br />

      <Jumbotron className="jumbotron-main">
        <h2>Add/Edit Group</h2>

        <br />
        {nameInput}

        <div className="phone-inputs">
          { phoneInputs }
        </div>
        <br />
        <Col xs={6}>
          <Button justified block onClick={this.addField.bind(this)} bsStyle="info">Add Phone Number</Button>
        </Col>
        <Col xs={6}>
          <Button justified block onClick={this.saveGroup.bind(this)} bsStyle="info">Save Group</Button>
        </Col>

        <br />

      </Jumbotron>

    </div>

    )
  }
};

EditView.propTypes = {
  phoneNumbers: React.PropTypes.array,
  groupName: React.PropTypes.string
};

EditView.defaultProps = {
  phoneNumbers: [],
  groupName: ""
};

EditView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default EditView;