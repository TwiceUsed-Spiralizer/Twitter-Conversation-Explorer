import React from 'react';
import { Navbar, NavItem, Icon, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import '../index.css';

export default () =>
  (
    <Navbar brand={'Tweet Insight'} right style={{ marginBottom: '20px', paddingLeft: '20px' }}>
      <Row>
        <NavItem><Link to="/login"><Icon right>account_circle</Icon>Login</Link></NavItem>
      </Row>
    </Navbar>
  );
