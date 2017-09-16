import React from 'react';
import { Navbar, NavItem, Dropdown, Button, Icon, Badge } from 'react-materialize';
import { Route, Switch, Link } from 'react-router-dom';
import { Query, Favourites, Board } from './containers';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav>
        <Navbar brand={<Link to="/">Tweet Insight</Link>} right>
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
};

export default App;
