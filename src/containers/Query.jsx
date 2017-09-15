import React from 'react';
import { Col, Row } from 'react-materialize';
import { QueryBuilder, QueryResults } from '../components';

export default props => (
  <Row>
    <Col m={3}>
      <QueryBuilder />
    </Col>
    <Col m={9}>
      <QueryResults />
    </Col>
  </Row>
);
