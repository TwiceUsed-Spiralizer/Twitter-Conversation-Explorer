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
  }
  

<<<<<<< 4d78601e23ffc7ca47ecf50b658deac92b74cc30
<<<<<<< 6f2c97471952b9165e3cabd8d7fc6b67afd234c9
  getData() {
    axios.get('/api/example')
      .then((res) => {
        const womenPercent = (res.data.femaleSorry / res.data.female) * 100;
        const menPercent = (res.data.maleSorry / res.data.male) * 100;
        const total = womenPercent + menPercent;
        const womenLength = (womenPercent / total) * 600;
        const menLength = (menPercent / total) * 600;
        this.setState({ data: { menLength, womenLength }  });
      });
=======
  query(keyword) {
=======
  query(keyword, gender) {
>>>>>>> Tidy up modules
    this.setState(prevState => ({
      queryResults: [true, ...prevState.queryResults.slice(1)],
    }));
>>>>>>> Add example use of TwitterDoughnut in QueryResults
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

<<<<<<< 6f2c97471952b9165e3cabd8d7fc6b67afd234c9
          <Col l={3}><QueryBuilder getData={this.getData} /></Col>

=======
          <Col l={3}><QueryBuilder getData={this.query} /></Col>
          <Col l={9}><QueryResults results={this.state.queryResults} /></Col>
>>>>>>> Add example use of TwitterDoughnut in QueryResults
          <Col l={9}><TCECanvas data={this.state.data} /></Col>

        </div>
      </div>
    );
  }
}

export default App;
