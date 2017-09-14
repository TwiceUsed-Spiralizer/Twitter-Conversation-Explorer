import React from 'react';
import { Col, Row, Collapsible } from 'react-materialize';
import './Canvas.css';
import ChartComponent from './chartComponents';
import CollapsibleChart from './ChartWrappers/CollapsibleChart'

const TCECanvas = (props) => {
  return (
    <Row>
      {/* <QueryResults results={props.results} moveToBoard={props.moveToBoard} /> */}
      <Col m={4}>
        <h3>Saved</h3>
        <Collapsible popout accordion>
          {props.boards.saved.map(ChartComponent(CollapsibleChart(props.moveToBoard, 'saved')))}
        </Collapsible>
      </Col>
      <Col m={4}>
        <h3>Maybe</h3>
        <Collapsible popout accordion>
          {props.boards.maybe.map(ChartComponent(CollapsibleChart(console.log)))}
        </Collapsible>
      </Col>
      <Col m={4}>
        <h3>Final</h3>
      </Col>
    </Row>
  );
};

export default TCECanvas;
