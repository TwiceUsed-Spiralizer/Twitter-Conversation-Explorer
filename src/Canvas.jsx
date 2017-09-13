import React from 'react';
import './Canvas.css';
import { Col, Row, Collapsible, CollapsibleItem } from 'react-materialize';
import QueryResults from './QueryResults';
import ChartComponent from './chartComponents';

const TCECanvas = (props) => {
  return (
    <Row>
      <QueryResults results={props.results} />
      <Col m={4}>
        <h3>Saved</h3>
        <Collapsible popout accordion>
          {props.board.map(ChartComponent(CollapsibleItem))}
        </Collapsible>
      </Col>
      <Col m={4}>
        <h3>Maybe</h3>
      </Col>
      <Col m={4}>
        <h3>Final</h3>
      </Col>
    </Row>
  );
};

export default TCECanvas;
