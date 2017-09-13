import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';
import './QueryResults.css';
import ChartComponent from './chartComponents';

export default class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.newQuery) {
      this.setState({
        carousel: null,
      });
    }
    setTimeout(() => this.setState({
      carousel: (
        <Carousel>
          {
            nextProps.results.map(ChartComponent(Card, this.props.moveToBoard))
          }
        </Carousel>
      )
    }), 0);
  }

  render() {
    return (
      <div id="results-carousel">
        <Container>
          {
            this.state.carousel

          }
        </Container>
      </div>
    )
  }
}
