import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, NavItem, Col, Row, Dropdown, Button, Icon, Badge } from 'react-materialize';
import { Route, Switch } from 'react-router-dom';
import { Query, Favourites, Board } from './containers';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.blankResults = [{ data: false }];
    this.state = {
      data: {},
      queryResults: [],
      boards: {
        saved: [],
        maybe: [],
        final: [],
      },
    };
    this.query = this.query.bind(this);
    this.moveToBoard = this.moveToBoard.bind(this);
  }

  moveToBoard(index, fromBoard, toBoard) {
    if (fromBoard && toBoard) {
      this.setState((prevState) => {
        console.log(fromBoard, toBoard);
        const boards = prevState.boards;
        boards[toBoard] = boards[toBoard].concat(boards[fromBoard].splice(index, 1));
        return { boards };
      });
    } else {
      this.setState(prevState => ({
        boards: {
          ...prevState.boards,
          saved: prevState.boards.saved.concat(prevState.queryResults.splice(index, 1)),
        },
        queryResults: prevState.queryResults,
      }));
    }
  }

  query(keyword, senderGender) {
    this.setState({
      queryResults: this.blankResults,
    });
    axios.post('/api/KeywordAcrossGender', { keyword })
      .then(res =>
        this.setState(prevState => ({
          queryResults: prevState.queryResults.concat([
            { type: 'doughnut', icon: 'pie_chart', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword },
            { type: 'chiSquared', icon: 'format_list_numbered', data: res.data, title: `Breakdown of ${keyword} by gender`, keyword },
          ]).filter(item => item.type),
        })),
      );
    axios.post('/api/SelectionsOverTime', { keyword, senderGender })
      .then(res =>
        this.setState(prevState => ({
          queryResults: prevState.queryResults.concat({
            type: 'line',
            icon: 'show_chart',
            data: res.data,
            title: `Breakdown of use of ${keyword} by time for ${senderGender ? 'women' : 'men'}`,
            keyword,
          }).filter(item => item.type),
        })),
      );
    axios.post('/api/BucketedBarChart', { keyword })
      .then(res =>
        this.setState(prevState => ({
          queryResults: prevState.queryResults.concat({
            type: 'histogram',
            icon: 'insert_chart',
            data: res.data,
            title: `Breakdown of use of ${keyword} by gender and follower count`,
            keyword,
          }).filter(item => item.type),
        })),
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
        <Switch>
          <Route exact path="/" component={Query} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/board/:boardName" component={Board} />
        </Switch>
      </div>
    );
  }
}

export default App;
