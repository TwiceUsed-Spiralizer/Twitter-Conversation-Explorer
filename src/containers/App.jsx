import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query, Favourites, Board, NavBar } from './index';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Query} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/board/:boardName" component={Board} />
      </Switch>
    </div>
  );
};

export default App;
