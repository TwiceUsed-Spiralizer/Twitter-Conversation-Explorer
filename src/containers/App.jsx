import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query, Favourites, Board, BoardTabs, NavBar } from './index';
import { Auth } from '../components';
import './App.css';
import '../index.css';
import firebase from '../firebase';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.login(user);
        firebase.database().ref(`/charts/${user.uid}`).on('value', snapshot => this.props.setCharts(snapshot.val()));
        firebase.database().ref(`/boards/${user.uid}`).on('value', snapshot => this.props.setBoards(snapshot.val() || {}));
      } else {
        this.props.logout();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Query} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/boards" component={BoardTabs} />
          <Route path="/boards/:boardName" component={Board} />
          <Route path="/login" component={Auth} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch({ type: 'LOGIN', user }),
  logout: () => dispatch({ type: 'LOGOUT' }),
  setFavourites: favourites => dispatch({ type: 'FAVOURITES_SET', favourites }),
  addFavourite: chartObject => dispatch({ type: 'FAVOURITES_ADD', chartObject }),
  setCharts: charts => dispatch({ type: 'CHARTS_SET', charts }),
  setBoards: boards => dispatch({ type: 'BOARDS_SET', boards }),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
