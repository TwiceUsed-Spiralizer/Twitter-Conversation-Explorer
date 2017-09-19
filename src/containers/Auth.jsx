import React from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase';

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
  }

  render() {
    return <div id="firebaseui-auth-container" />;
  }
}

export default Auth;
