import React from 'react';
import { Card, Carousel, Container } from 'react-materialize';

export default class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('change', nextProps);
    this.setState({
      carousel: null,
    })
    setTimeout(() => this.setState({
      carousel: (
        <Carousel>
          {nextProps.results.map(item => <Card>{item}</Card>)}
        </Carousel>
      )
    }), 0);
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        {JSON.stringify(this.props.results)}
        {
          this.state.carousel

        }
      </Container>
    )
  }
}
