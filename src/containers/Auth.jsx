import React from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import { connect } from 'react-redux';

class Auth extends React.Component {

  componentDidMount() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
    };

    new firebaseui.auth.AuthUI(firebase.auth()).start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged((user) => {
      this.props.login(user);
    });
  }

  render() {
    return <div id="firebaseui-auth-container" />;
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch({ type: 'LOGIN', user }),
  logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapDispatchToProps)(Auth);
