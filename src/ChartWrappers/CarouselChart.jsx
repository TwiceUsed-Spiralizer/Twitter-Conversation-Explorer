import React from 'react';
import { Card, Icon } from 'react-materialize';

export default clickHandler =>
  props => (
    <Card {...props} onClick={() => clickHandler(props.index)} title={<Icon left>{props.icon}</Icon>} />
  );
