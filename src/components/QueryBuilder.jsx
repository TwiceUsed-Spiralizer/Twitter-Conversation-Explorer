import React, { Component } from 'react';
import { Row, Col, Input, Button, Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      gender: 1,
    };
    this.query = this.query.bind(this);
    this.props.clearResults();
    this.getId = () => Math.floor(Math.random() * 100000);
  }

  query() {
    const keyword = this.state.keyword;
    const senderGender = this.state.gender;
    this.setState({ loading: true });
    const endLoading = () => this.setState({ loading: false });
    axios.post('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.props.addToResults([
          { type: 'doughnut', icon: 'pie_chart', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword, id: this.getId() },
          { type: 'chiSquared', icon: 'format_list_numbered', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword, id: this.getId() },
        ]))
      .then(endLoading);
    axios.post('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.props.addToResults({
          type: 'line',
          icon: 'show_chart',
          data: res.data,
          title: `Breakdown of use of ${keyword} by time for ${senderGender ? 'women' : 'men'}`,
          keyword,
          id: this.getId(),
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
          id: this.getId(),
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
        <Row>
          <Col m={6}>
            <Button onClick={this.query} >Submit</Button>
          </Col>
          <Col m={6}>
            {this.state.loading ? <Preloader big flashing /> : null}
          </Col>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  charts: state.charts,
  favourites: state.favourites,
  boards: state.boards,
});

const mapDispatchToProps = dispatch => ({
  addToResults: results => dispatch({ type: 'RESULTS_RECEIVED', results }),
  loadingResults: () => dispatch({ type: 'RESULTS_RESET' }),
  clearResults: () => dispatch({ type: 'RESULTS_CLEAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilder);
