import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query, Favourites, Board, NavBar, Auth } from './index';
import './App.css';
import firebase from '../firebase';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.props.login);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Query} />
          <Route exact path="/favourites" component={Favourites} />
          <Route path="/board/:boardName" component={Board} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch({ type: 'LOGIN', user }),
  logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(null, mapDispatchToProps)(App);
