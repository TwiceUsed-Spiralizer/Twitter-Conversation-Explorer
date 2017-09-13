import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';
import ChartComponent from './chartComponents'

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
    }
    setTimeout(() => this.setState({
      carousel: (
        <Carousel>
          {
            nextProps.results.map(ChartComponent(Card))
          }
        </Carousel>
      )
    }), 0);
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
