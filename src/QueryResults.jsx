import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';
import { TwitterDoughnut, LineGraph, ChiSquared, Histogram } from './chartComponents'

export default class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      carousel: null,
    })
    setTimeout(() => this.setState({
      carousel: (
        <Carousel>
          <Card>
            <TwitterDoughnut data={nextProps.results[0]} />
            <ChiSquared data={nextProps.results[0]} />
          </Card>
        </Carousel>
      )
    }), 0);
    console.log(this.state);
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
