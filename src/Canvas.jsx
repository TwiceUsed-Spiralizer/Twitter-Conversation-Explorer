import React from 'react';
import './App.css';
import { Row, Input, Button } from '../node_modules/react-materialize';

const TCECanvas = props =>
  (
    <Row>
      <div>{JSON.stringify(props.data)}</div>
    </Row>
  );

export default TCECanvas;
