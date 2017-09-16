import React from 'react';
import { Button, Col, Row, Icon, Card, Chip } from 'react-materialize';
import './FavouritesChart.css';

export default unfavourite =>
  props => (
    <Col m={4}>
      <Card horizontal header={<div style={{ height: '300px', margin: '10px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        {props.title}
        <Row id="favourite-button-group">
          <Col m={4}>
            <Chip><div onClick={() => unfavourite(props.chartObject.id)}><Icon small className="favourite-button starred" /></div></Chip>
          </Col>
          <Col m={4}>
            <Chip><Icon small className="favourite-button">play_for_work</Icon></Chip>
          </Col>
          <Col m={4}>
            <Chip><Icon small className="favourite-button">share</Icon></Chip>
          </Col>
        </Row>
      </Card>
    </Col>
  );
