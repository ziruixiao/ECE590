/**
 * Created by Felix on 1/8/16.
 */
import React from 'react';
import {
  Col,
  Input,
  Button,
Jumbotron,
Glyphicon
} from 'react-bootstrap';

class GroupsView extends React.Component{

  addNewGroup() {
    var router = this.context.router;
    router.transitionTo('edit', {groupId: '-1'});
  }
  render(){

    var groupTiles =
      <Col xs={6}>

      </Col>;


    return (
      <div className="page-center-all">
        <br />

        <Jumbotron className="jumbotron-main">
          <h2>My Groups</h2>

          <br />

          <Col xs={6}>
            <Button onClick={this.addNewGroup.bind(this)} bsStyle="info" bsSize="large" block justified><Glyphicon glyph="plus" />{ ' ' }New Group</Button>
          </Col>
          {groupTiles}

          <br />

        </Jumbotron>



      </div>
    )
  }
};

GroupsView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default GroupsView;