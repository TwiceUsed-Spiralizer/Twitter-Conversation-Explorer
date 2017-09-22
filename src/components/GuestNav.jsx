import React from 'react';
import { Navbar, NavItem, Icon, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import '../index.css';

export default () =>
  (
    <Navbar brand={<Link to="/">Tweet Insight</Link>} right style={{ 'margin-bottom': '20px', 'padding-left': '20px' }}>
      <Row>
        <NavItem><Link to="/login"><Icon right>account_circle</Icon>Login</Link></NavItem>
      </Row>
    </Navbar>
  );
