import * as firebase from 'firebase';
// import './auth';

const config = {
  apiKey: 'AIzaSyCahOZdM81WSjp9nU0gNHwsTdpnoY9PLak',
  authDomain: 'tweet-insight.firebaseapp.com',
  databaseURL: 'https://tweet-insight.firebaseio.com',
  projectId: 'tweet-insight',
  storageBucket: 'tweet-insight.appspot.com',
  messagingSenderId: '453100078372'
};

export default firebase.initializeApp(config);
