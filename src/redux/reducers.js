import { combineReducers } from 'redux';

const results = (state, action) => {
  console.log(state);
  if (state === undefined) {
    return [];
  }
  switch (action.type) {
    case 'RESULTS_RESET':
      return [{ data: false }];
    case 'RESULTS_RECEIVED':
      return state.filter(item => item.data).concat(action.results);
    default:
      return state;
  }
};

export default combineReducers({
  results,
});
