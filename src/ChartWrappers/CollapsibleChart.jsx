import React from 'react';
import { CollapsibleItem } from 'react-materialize';

export default clickHandler =>
  props => (
    <CollapsibleItem {...props} onClick={() => clickHandler(props.index)} icon={props.icon} />
  );
