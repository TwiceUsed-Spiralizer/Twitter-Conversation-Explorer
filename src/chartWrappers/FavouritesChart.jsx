import React from 'react';
import { Button, Col, Row, Icon, Card } from 'react-materialize';
import './FavouritesChart.css';

export default clickHandler =>
  props => (
    <Col m={4}>
      <Card horizontal header={<div style={{ height: '300px', margin: '10px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        {props.title}
        <Row>
          <Col m={3}>
            <Icon className="starred">star</Icon>
          </Col>
          <Col m={3}>
            <Icon>play_for_work</Icon>
          </Col>
          <Col m={3}>
            <Icon>share</Icon>
          </Col>
        </Row>
      </Card>
    </Col>
  );
