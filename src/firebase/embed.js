import Materialize from 'materialize-css';
import firebase from './index';

let chartsRef;
const embedRef = firebase.database().ref('/embeds');
firebase.auth().onAuthStateChanged((user) => {
  chartsRef = firebase.database().ref(`/charts/${user.uid}/`)
});

const toaster = (embedId) => {
  let toast = document.createElement('span');
  let closeButton = document.createElement('button');
  toast.textContent = `<iframe width="560" height="315" src="http://twinsighttest-env.eiwejfj7bv.us-east-2.elasticbeanstalk.com/embed/${embedId}" frameborder="0" ></iframe>     `;
  closeButton.innerHTML = '\t<button style="color:orange;" class="toast-action" onclick="Materialize.Toast.removeAll()">Undo</button>';
  toast.appendChild(closeButton);
  Materialize.toast(toast);
}

const embed = (chartObject) => {
  const { resultsIndex, ...restOfObject } = chartObject;
  if (chartObject.embedId) {
    toaster(chartObject.embedId);
    return new Promise(resolve => resolve(chartObject.embedId));
  }
  return embedRef.push(restOfObject).then((item) => {
    toaster(item.key);
    if (chartObject.id) {
      return chartsRef.child(`${chartObject.id}/embedId`).set(item.key).then(() => item.key);
    }
    return item.key;
  });
};

export default embed;
