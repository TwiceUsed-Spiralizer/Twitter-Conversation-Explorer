import React, { Component } from 'react';
import './App.css';
import { Row, Input, Button } from '../node_modules/react-materialize';

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
        <Input placeholder="Placeholder" s={6} label="First Name" />
        <Input s={6} label="Last Name" />
        <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
        <Input type="password" label="password" s={12} />
        <Input type="email" label="Email" s={12} />
        <Row>
          <p> WHEN </p>
          <Input name="on" type="date" label="Click to pick your date!" />
        </Row>
        <Button onClick={this.props.getData} />
      </Row>
    );
  }
}

export default QueryBuilder;
