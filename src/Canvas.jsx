import React from 'react';
import './Canvas.css';
import { Col, Container, Collapsible, CollapsibleItem } from 'react-materialize';
import QueryResults from './QueryResults';

const TCECanvas = (props) => {
  return (
    <Container>
      <QueryResults results={props.results} />
      <Col m={4}>
        <h3>Saved</h3>
        <Collapsible>
          {props.board.map(item => <CollapsibleItem header={item}>{item}</CollapsibleItem>)}
        </Collapsible>
      </Col>
      <Col m={4}>
        <h3>Maybe</h3>
      </Col>
      <Col m={4}>
        <h3>Final</h3>
      </Col>
    </Container>
  );
};

export default TCECanvas;
