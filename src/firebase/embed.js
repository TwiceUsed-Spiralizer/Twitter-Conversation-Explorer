import firebase from './index';

let chartsRef;
const embedRef = firebase.database().ref('/embeds');
firebase.auth().onAuthStateChanged((user) => {
  chartsRef = firebase.database().ref(`/charts/${user.uid}/`)
});

const embed = (chartObject) => {
  const { resultsIndex, ...restOfObject } = chartObject;
  return embedRef.push(restOfObject).then((item) => {
    if (chartObject.id) {
      return chartsRef.child(`${chartObject.id}/embedId`).set(item.key).then(() => item.key);
    }
    return item.key;
  });
};

export default embed;
