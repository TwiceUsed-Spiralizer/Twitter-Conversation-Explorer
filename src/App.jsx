import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, NavItem, Col, Dropdown, Button, Icon, Badge } from '../node_modules/react-materialize';
import QueryBuilder from './querybuilder';
import TCECanvas from './canvas';

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: '',
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    axios.get('/api/example')
      .then(res => this.setState({ data: res.data }));
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

          <Col l={3}><QueryBuilder getData={this.getData} /></Col>

          <Col l={9}><TCECanvas data={this.state.data} /></Col>

        </div>
      </div>
    );
  }
}

export default App;
