import React from 'react';
import { Navbar, Icon } from 'react-materialize';
import '../containers/App.css';
import '../index.css';

export default () => (
  <Navbar brand="Tweet Insight" right style={{ marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
    <div>Loading<Icon right>sync</Icon></div>
  </Navbar>
);
