import React from 'react';
import { Button, Icon, Card } from 'react-materialize';

export default clickHandler =>
  props => (
    <Card {...props} title={<Icon left>{props.icon}</Icon>}>
      <h5 style={{ textAlign: 'center' }}>{props.title}</h5>
      <div style={{ height: '750px', width: '75%', margin: 'auto' }}>{props.children}</div>
      {props.chartObject &&
        props.chartObject.favourited
        ? <Button><Icon left style={{ color: 'gold' }}>star</Icon>Favourited</Button>
        : <Button onClick={() => clickHandler(props.chartObject)}><Icon left>star_border</Icon> Favourite</Button>
      }
    </Card>
  );
