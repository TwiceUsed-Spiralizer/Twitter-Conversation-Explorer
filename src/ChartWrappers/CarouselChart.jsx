import React from 'react';
import { Button, Card, Icon, Container } from 'react-materialize';

export default clickHandler =>
  props => (
    <Card {...props} title={<Icon left>{props.icon}</Icon>}>
      <div style={{ height: '350px' }}>{props.children}</div>
      {props.chartObject && <Button onClick={() => clickHandler(props.index)}><Icon left>save</Icon>Save</Button>}
    </Card>
  );
