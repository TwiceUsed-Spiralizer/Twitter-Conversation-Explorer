import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';
import './QueryResults.css';
import ChartComponent from './chartComponents';
import CarouselChart from './ChartWrappers/CarouselChart';

export default class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: [],
    }
    this.chartWrapper = CarouselChart(this.props.moveToBoard);
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
            nextProps.results.map(ChartComponent(this.chartWrapper))
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
