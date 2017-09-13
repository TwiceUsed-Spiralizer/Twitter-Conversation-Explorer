import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      gender: 1,
    };
  }

  render() {
    return (
      <Row>
        <p>WHO</p>
        <Input s={6} type="select" label="Gender" defaultValue={1} onChange={event => this.setState({ gender: event.target.value })} >
          <option value={0}>Male</option>
          <option value={1}>Female</option>
        </Input>
        {/* <Input s={6} label="Location" /> */}
        {/* <Input label="Follower Count" s={12} /> */}
        <Input label="Keyword" s={12} onChange={event => this.setState({ keyword: event.target.value })} />
        <Row>
          <p> WHEN </p>
          <Input name="on" type="date" label="Click to pick your date!" />
        </Row>
        <Button onClick={() => this.props.query(this.state.keyword, this.state.gender)} >Submit yo' shizzle</Button>
      </Row>
    );
  }
}

export default QueryBuilder;
