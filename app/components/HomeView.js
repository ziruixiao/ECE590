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

    return (
      <div className="page-center-all">
        <br />
        <br />
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