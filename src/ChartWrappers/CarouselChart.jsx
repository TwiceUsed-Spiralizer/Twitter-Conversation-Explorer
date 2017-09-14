import React from 'react';
import { Button, Icon } from 'react-materialize';

export default clickHandler =>
  props => (
    <div {...props} title={<Icon left>{props.icon}</Icon>}>
      <h5 style={{ textAlign: 'center' }}>{props.title}</h5>
        <div style={{ height: '450px', width: '75%', margin: 'auto' }}>{props.children}</div>
      {props.chartObject && <Button onClick={() => clickHandler(props.index)}><Icon left>save</Icon>Save</Button>}
    </div>
  );
