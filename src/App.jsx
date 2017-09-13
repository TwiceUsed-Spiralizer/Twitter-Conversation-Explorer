import Chart from 'chart.js';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, NavItem, Col, Dropdown, Button, Icon, Badge } from 'react-materialize';
import QueryBuilder from './querybuilder';
import TCECanvas from './Canvas';
import TwitterDoughnut from './chartComponents';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      queryComponents: [<div>balls</div>, <div>farts</div>],
    };
    this.query = this.query.bind(this);
  }

  query(keyword) {
    let queryComponents = this.state.queryComponents.concat('poop');
    console.log(queryComponents);
    this.state.queryComponents.pop();
    this.setState({
      data: 'balls',
      queryComponents,
    });
  }


  render() {
    return (
      <div className="App">
        <nav>
          <Navbar brand="Twitter Conversation Explorer" css="margin:5px" right>
            <Button waves="light">Log In<Icon right>face</Icon></Button>
            <Button waves="light" >Sign Up<Icon right>face</Icon></Button>
            <Dropdown trigger={
              <Button waves="light"><Icon right>menu</Icon><Badge newIcon>4</Badge></Button>
            }
            >
              <NavItem>Profile</NavItem>
              <NavItem>Dashboard</NavItem>
              <NavItem>Saved Searches</NavItem>
              <NavItem>Logout</NavItem>
            </Dropdown>
          </Navbar>
        </nav>
        <div className="row">

          <Col l={3}><QueryBuilder getData={this.query} /></Col>

          <Col l={9}><TCECanvas data={this.state.data} queryComponents={this.state.queryComponents} /></Col>

        </div>
      </div>
    );
  }
}

export default App;
