import firebase from './index';

const embedRef = firebase.database().ref('/embeds');
const embed = (chartObject) => {
  const { resultsIndex, ...restOfObject } = chartObject;
  return embedRef.push(restOfObject).then(item => item.key);
};

export default embed;
