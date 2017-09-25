import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, ProgressBar, Card, Collapsible, CollapsibleItem } from 'react-materialize';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { connect } from 'react-redux';
import axios from 'axios';
import '../index.css';
import './QueryBuilder.css';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      recipientsGender: -1,
      senderGender: -1,
      sentiment: undefined,
      followerCount: {
        min: 0,
        max: 1000000,
      },
    };
    this.query = this.query.bind(this);
    this.resultsIndex = 0;
    this.props.clearResults();
  }

  query() {
    this.props.clearResults();
    this.setState({ loading: true });
    const keyword = this.state.keyword;
    const senderGender = Number(this.state.senderGender);
    const recipientsGender = Number(this.state.recipientsGender);
    const sentiment = Number(this.state.sentiment);
    const senderFollowerMin = Number(this.state.followerCount.min);
    const senderFollowerMax = Number(this.state.followerCount.max);
    this.setState({ loading: true });
    let results = [];
    const handleResults = (chartObjects) => {
      results = results.concat(chartObjects);
      if (results.length >= 9) {
        this.setState({ loading: false });
        this.props.addToResults(results);
      }
    };
    axios.post('/api/KeywordAcrossGender', { keyword, recipientsGender, sentiment, senderFollowerMin, senderFollowerMax })
      .then(res =>
        handleResults([
          { type: 'doughnut', icon: 'pie_chart', data: res.data, title: `Breakdown of "${keyword}" by Gender`, keyword, params: { columnA: 'Women', dataNameA: 'femaleSender', columnB: 'Men', dataNameB: 'maleSender' }, resultsIndex: this.resultsIndex++ },
          { type: 'chiSquared', icon: 'format_list_numbered', data: res.data, title: `Breakdown of "${keyword}" by Gender`, keyword, params: { columnA: 'Women', dataNameA: 'femaleSender', columnB: 'Men', dataNameB: 'maleSender' }, resultsIndex: this.resultsIndex++ },
        ]));
    axios.post('/api/SelectionsOverTime', { keyword, senderGender, recipientsGender, sentiment, senderFollowerMin, senderFollowerMax })
      .then(res =>
        handleResults({
          type: 'line',
          icon: 'show_chart',
          data: res.data,
          title: `Breakdown of Use of "${keyword}" by Time for ${senderGender ? 'women' : 'men'}`,
          keyword,
          resultsIndex: this.resultsIndex++,
        }),
      );
    axios.post('/api/BucketedBarChart', { keyword, recipientsGender, sentiment, senderFollowerMin, senderFollowerMax })
      .then(res =>
        handleResults({
          type: 'histogram',
          icon: 'insert_chart',
          data: res.data,
          title: `Breakdown of Use of "${keyword}" by Gender & Follower Count`,
          keyword,
          params: { columnA: 'Women', columnB: 'Men', dataNameA: 'Women', dataNameB: 'Men' },
          resultsIndex: this.resultsIndex++,
        }),
      );
    axios.post('/api/BucketedBarChartBodySentiment', { keyword, senderGender, recipientsGender, senderFollowerMin, senderFollowerMax })
      .then(res =>
        handleResults({
          type: 'histogram',
          icon: 'insert_chart',
          data: res.data,
          title: `Breakdown of Use of "${keyword}" by Sentiment & Follower Count`,
          keyword,
          params: { columnA: 'Positive Sentiment', columnB: 'Negative Sentiment', dataNameA: 'positiveSentiment', dataNameB: 'negativeSentiment' },          
          resultsIndex: this.resultsIndex++,
        }),
      );
    axios.post('/api/KeywordAcrossFollowerCount', { keyword, senderGender, recipientsGender, sentiment })
      .then(res =>
        handleResults([
          { type: 'doughnut',
            icon: 'pie_chart',
            data: res.data,
            title: `Breakdown of "${keyword}" by Follower Count`,
            keyword,
            params: { columnA: 'Over 500 Followers', columnB: 'Under 500 Followers', dataNameA: 'over500followers', dataNameB: 'under500followers' },
            resultsIndex: this.resultsIndex++ },
          { type: 'chiSquared',
            icon: 'format_list_numbered',
            data: res.data,
            title: `Breakdown of "${keyword}" by Follower Count`,
            keyword,
            params: { columnA: 'Over 500 Followers', columnB: 'Under 500 Followers', dataNameA: 'over500followers', dataNameB: 'under500followers' },
            resultsIndex: this.resultsIndex++ },
        ]));
    axios.post('/api/KeywordAcrossSentiment', { keyword, senderGender, recipientsGender, senderFollowerMin, senderFollowerMax })
      .then(res =>
        handleResults([
          { type: 'doughnut',
            icon: 'pie_chart',
            data: res.data,
            title: `Breakdown of "${keyword}" by Sentiment`,
            keyword,
            params: { columnA: 'Positive Sentiment', columnB: 'Negative Sentiment', dataNameA: 'positiveSentiment', dataNameB: 'negativeSentiment' },
            resultsIndex: this.resultsIndex++ },
          { type: 'chiSquared',
            icon: 'format_list_numbered',
            data: res.data,
            title: `Breakdown of "${keyword}" by Sentiment`,
            keyword,
            params: { columnA: 'Positive Sentiment', columnB: 'Negative Sentiment', dataNameA: 'positiveSentiment', dataNameB: 'negativeSentiment' },
            resultsIndex: this.resultsIndex++ },
        ]));
  }

  render() {
    return (
      <Card title="Build Your Query" className="light-background cerulean-text" actions={[<Button flat className="tangerine" waves="yellow" onClick={this.query} >Submit</Button>]} style={{ textAlign: 'center' }}>
        <Row />
        <Collapsible popout defaultActiveKey={0}>
          <CollapsibleItem header="Gender" icon="wc" style={{ textAlign: 'left' }} >
            <Row>
              <Input s={6} type="select" label="Gender of Sender's Tweets" defaultValue={-1} onChange={event => this.setState({ senderGender: event.target.value })} >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={-1}>None</option>
              </Input>
              <Input s={6} type="select" label="Gender of Recipients Tweets" defaultValue={-1} onChange={event => this.setState({ recipientsGender: event.target.value })} >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={-1}>None</option>
              </Input>
            </Row>
          </CollapsibleItem>
          <CollapsibleItem header="Keyword" icon="create" style={{ textAlign: 'left' }}>
            <Row>
              <Input label="Enter a Keyword" s={12} onChange={event => this.setState({ keyword: event.target.value })} />
            </Row>
          </CollapsibleItem>
          <CollapsibleItem header="Sentiment" icon="insert_emoticon" style={{ textAlign: 'left' }}>
            <Row>
              <Input s={12} type="select" label="Sentiment of Tweets" defaultValue={0} onChange={event => this.setState({ sentiment: event.target.value })} >
                <option value={-1}>:(</option>
                <option value={1}>:)</option>
                <option value={0}>None</option>
              </Input>
            </Row>
          </CollapsibleItem>
          <CollapsibleItem header="Follower Count" icon="group" style={{ textAlign: 'left' }}>
            <Row>
              <InputRange
                draggableTrack
                maxValue={1000000}
                minValue={0}
                step={500}
                formatLabel={value => `${value.toLocaleString()}`}
                value={this.state.followerCount}
                onChange={followerCount => this.setState({ followerCount })}
                onChangeComplete={followerCount => this.setState({ followerCount })}
                classNames={{
                  activeTrack: 'activeTrack',
                  disabledInputRange: 'disabledInputRange',
                  inputRange: 'inputRange',
                  labelContainer: 'labelContainer',
                  maxLabel: 'maxLabel label',
                  minLabel: 'minLabel label',
                  slider: 'slider',
                  sliderContainer: 'sliderContainer',
                  track: 'track',
                  valueLabel: 'valueLabel',
                }}
              />
            </Row>
          </CollapsibleItem>
          <Row />
          <Row>
            <Col m={12}>
              {this.state.loading ? <ProgressBar big className="red" /> : null}
            </Col>
          </Row>
        </Collapsible>
      </Card>
    );
  }
}

QueryBuilder.propTypes = {
  addToResults: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToResults: results => dispatch({ type: 'RESULTS_RECEIVED', results }),
  clearResults: () => dispatch({ type: 'RESULTS_CLEAR' }),
});

export default connect(null, mapDispatchToProps)(QueryBuilder);
