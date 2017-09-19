import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query, Favourites, Board, NavBar, Auth } from './index';
import './App.css';
import firebase from '../firebase';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.login(user);
        firebase.database().ref(`/favourites/${user.uid}`).on('value',
          (snapshot) => {
            this.props.setFavourites(snapshot.val());
          }
        );
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
  setFavourites: favourites => dispatch({ type: 'FAVOURITES_SET', favourites }),
  addFavourite: chartObject => dispatch({ type: 'FAVOURITES_ADD', chartObject }),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
