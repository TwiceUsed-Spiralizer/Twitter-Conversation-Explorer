import { combineReducers } from 'redux';
import { results, charts, favourites, boards } from './reducers';

const rootReducer = combineReducers({
  results,
  charts,
  favourites,
  boards,
});

export default rootReducer;
