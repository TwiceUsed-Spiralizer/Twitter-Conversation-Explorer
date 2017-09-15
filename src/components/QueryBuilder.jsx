import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';

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
        <Input s={12} type="select" label="Gender" defaultValue={1} onChange={event => this.setState({ gender: event.target.value })} >
          <option value={0}>Male</option>
          <option value={1}>Female</option>
        </Input>
        <Input label="Enter a Keyword" s={12} onChange={event => this.setState({ keyword: event.target.value })} />
        <Row>
          <p> WHEN </p>
          <Input name="on" type="date" label="Click to pick your date!" />
        </Row>
        <Button onClick={this.props.resetResults} >Submit</Button>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetResults: () => dispatch({ type: 'RESULTS_RESET' }),
});

export default connect(null, mapDispatchToProps)(QueryBuilder);
