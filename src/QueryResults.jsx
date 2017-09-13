import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';
import { TwitterDoughnut, LineGraph, ChiSquared, Histogram } from './chartComponents'

export default class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.length >= this.state.carousel.length) {
      this.setState({
        carousel: null,
      })
      setTimeout(() => this.setState({
        carousel: (
          <Carousel>
            <Card>
              <TwitterDoughnut data={nextProps.results[0]} />
              {/* <ChiSquared data={nextProps.results[0]} /> */}
              {/* <LineGraph data={nextProps.results[1]} /> */}
              {/* <Histogram data={nextProps.results[2]} /> */}
            </Card>
          </Carousel>
        )
      }), 0);
    }
  }

  render() {
    return (
      <Container>
        {
          this.state.carousel

        }
      </Container>
    )
  }
}
