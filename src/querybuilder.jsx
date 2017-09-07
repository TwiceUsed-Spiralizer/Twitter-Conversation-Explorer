import React, { Component } from 'react';
import './App.css';
import { Row, Input, Button } from 'react-materialize';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
    };
  }

  render() {
    return (
      <Row>
        <p>WHO</p>
        <Input s={6} label="Gender" />
        <Input s={6} label="Location" />
        <Input label="Follower Count" s={12} />
        <Input label="Keyword" s={12} />
        <Row>
          <p> WHEN </p>
          <Input name="on" type="date" label="Click to pick your date!" />
        </Row>
        <Button onClick={this.props.getData} >Submit yo' shizzle</Button>
      </Row>
    );
  }
}

export default QueryBuilder;
