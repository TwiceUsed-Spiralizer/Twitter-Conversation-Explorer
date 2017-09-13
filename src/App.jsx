import Chart from 'chart.js';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, NavItem, Col, Dropdown, Button, Icon, Badge, Carousel, Card } from 'react-materialize';
import QueryBuilder from './querybuilder';
import TCECanvas from './Canvas';
import QueryResults from './QueryResults';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      queryResults: new Array(4).fill(false),
    };
    this.query = this.query.bind(this);
  }
  
  query(keyword, senderGender) {
    this.setState({
      queryResults: new Array(4).fill(false),
    })
    axios.get('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.setState(prevState => ({
          queryResults: Object.assign(prevState.queryResults, [, res.data]),
        }))
      );
    axios.get('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.setState(prevState => ({
          queryResults: Object.assign(prevState.queryResults, [, res.data]),
        }))
      );
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

          <Col l={3}><QueryBuilder query={this.query} /></Col>
          <Col l={9}><QueryResults results={this.state.queryResults} /></Col>
          <Col l={9}><TCECanvas data={this.state.data} /></Col>

        </div>
      </div>
    );
  }
}

export default App;
