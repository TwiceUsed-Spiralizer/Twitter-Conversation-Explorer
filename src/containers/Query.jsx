import React from 'react';
import { Col } from 'react-materialize';
import { QueryBuilder, QueryResults } from '../components';

export default props => (
  <div>
    <Col m={3}>
      bum
      {/* <QueryBuilder /> */}
    </Col>
    <Col m={9}>
      <QueryResults />
    </Col>
  </div>
);
