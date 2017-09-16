import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      gender: 1,
    };
    this.query = this.query.bind(this);
    this.props.clearResults();
  }

  query() {
    const keyword = this.state.keyword;
    const senderGender = this.state.gender;
    this.props.loadingResults();
    axios.post('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.props.addToResults([
          { type: 'doughnut', icon: 'pie_chart', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword },
          { type: 'chiSquared', icon: 'format_list_numbered', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword },
        ]));
    axios.post('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.props.addToResults({
          type: 'line',
          icon: 'show_chart',
          data: res.data,
          title: `Breakdown of use of ${keyword} by time for ${senderGender ? 'women' : 'men'}`,
          keyword,
        })
      );
    axios.post('/api/BucketedBarChart', { keyword })
      .then(res =>
        this.props.addToResults({
          type: 'histogram',
          icon: 'insert_chart',
          data: res.data,
          title: `Breakdown of use of ${keyword} by gender and follower count`,
          keyword,
        })
      );
  }

  render() {
    return (
      <Row>
        <p>WHO</p>
        <Input s={12} type="select" label="Gender" defaultValue={1} onChange={event => this.setState({ gender: event.target.value })} >
          <option value={0}>Male</option>
          <option value={1}>Female</option>
          <option value={2}>None</option>
        </Input>
        <Input label="Enter a Keyword" s={12} onChange={event => this.setState({ keyword: event.target.value })} />
        <Row>
          <p> WHEN </p>
          <Input name="on" type="date" label="Click to pick your date!" />
        </Row>
        <Button onClick={this.query} >Submit</Button>
        <Link to="/favourites">Favourites</Link>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToResults: results => dispatch({ type: 'RESULTS_RECEIVED', results }),
  loadingResults: () => dispatch({ type: 'RESULTS_RESET' }),
  clearResults: () => dispatch({ type: 'RESULTS_CLEAR' }),
});

export default connect(null, mapDispatchToProps)(QueryBuilder);
