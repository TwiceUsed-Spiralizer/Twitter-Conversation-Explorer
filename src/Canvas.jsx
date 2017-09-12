import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import './App.css';
import { Col, Row, Container, Carousel, Card } from 'react-materialize';

const TCECanvas = (props) => {
  return (
    <Row>
      {JSON.stringify(props.data)}
      <Carousel>
        {props.queryComponents.map(item => <Card>{item}</Card>)}
      </Carousel>
      <Container>
        <Col m={6}>

        </Col>
      </Container>
    </Row>
  );
};

export default TCECanvas;
