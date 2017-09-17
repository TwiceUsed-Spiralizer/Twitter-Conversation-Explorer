import React from 'react';
import { Button, Icon } from 'react-materialize';

export default clickHandler =>
  props => (
    <div {...props} title={<Icon left>{props.icon}</Icon>}>
      <h5 style={{ textAlign: 'center' }}>{props.title}</h5>
        <div style={{ height: '750px', width: '75%', margin: 'auto' }}>{props.children}</div>
      {props.chartObject && <Button onClick={() => clickHandler(props.chartObject)}><Icon left>save</Icon>{props.chartObject.favourited ? 'Saved' : 'Save'}</Button>}
    </div>
  );
