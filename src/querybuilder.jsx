import React, { Component } from 'react';
import './App.css';
import { Col, Button, Icon, Row, Input } from '../node_modules/react-materialize';

class QueryBuilder extends Component {
  constructor() {
    super();
    this.state = {
      temp: '',
    };
  }

  render() {
    return (
      <Row>
        <Input placeholder="Placeholder" s={6} label="First Name" />
        <Input s={6} label="Last Name" />
        <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
        <Input type="password" label="password" s={12} />
        <Input type="email" label="Email" s={12} />
        <Row>
          <Input name="on" type="date" onChange={function (e, value) {}} /> Date Picker
        </Row>
      </Row>
    );
  }
}

export default QueryBuilder;
