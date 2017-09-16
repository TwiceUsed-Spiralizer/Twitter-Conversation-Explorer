import React from 'react';
import { Navbar, NavItem, Dropdown, Button, Icon } from 'react-materialize';
import { Route, Switch, Link } from 'react-router-dom';
import { Query, Favourites, Board } from './index';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav>
        <Navbar brand={<Link to="/">Tweet Insight</Link>} right>
          <Button waves="light">Log In</Button>
          <Button waves="light" >Sign Up</Button>
          <Dropdown trigger={
            <Button waves="light"><Icon center>menu</Icon></Button>
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
};

export default App;
