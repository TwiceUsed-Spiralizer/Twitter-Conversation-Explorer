import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, NavItem, Col, Row, Dropdown, Button, Icon, Badge } from 'react-materialize';
import QueryBuilder from './querybuilder';
import TCECanvas from './Canvas';
import QueryResults from './QueryResults';

class App extends Component {
  constructor() {
    super();
    this.blankResults = [{type: 'doughnut', data: false}, {type: 'chiSquared', data: false}, {type: 'line', data: false}, {type: 'histogram', data: false}];
    this.state = {
      data: {},
      queryResults: this.blankResults,
      board: [1, 2, 3],
    };
    this.query = this.query.bind(this);
  }
  
  query(keyword, senderGender) {
    const blankResults = this.blankResults.slice();
    blankResults.newQuery = true;
    this.setState({
      queryResults: blankResults,
    })
    axios.post('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.setState(prevState => ({
          queryResults: Object.assign(prevState.queryResults, [{type: 'doughnut', icon: "pie_chart", data: res.data}, {type: 'chiSquared', icon: "format_list_numbered", data: res.data}]),
        }))
      );
    axios.post('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.setState(prevState => ({
          queryResults: Object.assign(prevState.queryResults, [,, {type: 'line', icon: "show_chart", data: res.data}]),
        }))
      );
    axios.post('/api/BucketedBarChart', { keyword })
      .then(res =>
        this.setState(prevState => ({
          queryResults: Object.assign(prevState.queryResults, [,,, {type: 'histogram', icon: "insert_chart", data: res.data }]),
        }))
      );
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Navbar brand="Twitter Conversation Explorer" right>
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
        <Row>

          <Col l={3}><QueryBuilder query={this.query} /></Col>
          <Col l={9}><TCECanvas data={this.state.data} results={this.state.queryResults} board={this.state.board} /></Col>

        </Row>
      </div>
    );
  }
}

export default App;
