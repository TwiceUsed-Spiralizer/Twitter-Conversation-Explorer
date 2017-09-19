import React, { Component } from 'react';
import { Row, Col, Input, Button, Preloader, Card } from 'react-materialize';
import Slider from 'material-ui/Slider';
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
    this.resultsIndex = 0;
    this.props.clearResults();
  }

  query() {
    const keyword = this.state.keyword;
    const senderGender = this.state.gender;
    this.setState({ loading: true });
    const endLoading = () => this.setState({ loading: false });
    axios.post('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.props.addToResults([
          { type: 'doughnut', icon: 'pie_chart', data: res.data, title: `Breakdown of ${keyword} by Gender`, keyword, resultsIndex: this.resultsIndex++ },
          { type: 'chiSquared', icon: 'format_list_numbered', data: res.data, title: `Breakdown of ${keyword} by Gender`, keyword, resultsIndex: this.resultsIndex++ },
        ]))
      .then(endLoading);
    axios.post('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.props.addToResults({
          type: 'line',
          icon: 'show_chart',
          data: res.data,
          title: `Breakdown of Use of ${keyword} by Time for ${senderGender ? 'women' : 'men'}`,
          keyword,
          resultsIndex: this.resultsIndex++,
        }),
      );
    axios.post('/api/BucketedBarChart', { keyword })
      .then(res =>
        this.props.addToResults({
          type: 'histogram',
          icon: 'insert_chart',
          data: res.data,
          title: `Breakdown of Use of ${keyword} by Gender and Follower Count`,
          keyword,
          resultsIndex: this.resultsIndex++,
        }),
      );
  }

  render() {
    return (
      <Card header={<h3 style={{ textAlign: 'center' }}>Build your Query</h3>}>
        <Card s={12} title="WHO">
          <Input s={6} type="select" label="Gender of Sender's Tweets" defaultValue={2} onChange={event => this.setState({ gender: event.target.value })} >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>None</option>
          </Input>
          <Input s={6} type="select" label="Gender of Recipients Tweets" defaultValue={2} onChange={event => this.setState({ gender: event.target.value })} >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>None</option>
          </Input>
        </Card>
        <Card>
          <Input label="Enter a Keyword" s={12} onChange={event => this.setState({ keyword: event.target.value })} />
        </Card>
        <Card>
          <Slider />
        </Card>
        <Card s={12}>
          <Input s={12} type="select" label="Gender of Recipients Tweets" defaultValue={2} onChange={event => this.setState({ gender: event.target.value })} >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </Input>
        </Card>
        <Row>
          <Col m={6}>
            <Button onClick={this.query} >Submit</Button>
          </Col>
          <Col m={6}>
            {this.state.loading ? <Preloader big flashing /> : null}
          </Col>
        </Row>
      </Card>
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
