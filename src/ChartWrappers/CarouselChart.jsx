import React from 'react';
import { Button, Card, Icon } from 'react-materialize';

export default clickHandler =>
  props => (
    <Card {...props} title={<Icon left>{props.icon}</Icon>}>
      {props.children}
      {props.chartObject && <Button onClick={() => clickHandler(props.index)}><Icon left>save</Icon>Save</Button>}
    </Card>
  );
