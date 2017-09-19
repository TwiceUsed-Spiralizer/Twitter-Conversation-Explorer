/* eslint no-case-declarations: 0 */
import { combineReducers } from 'redux';

export const results = (state, action) => {
  if (state === undefined) {
    return [];
  }
  switch (action.type) {
    case 'RESULTS_RESET':
      return [];
    case 'RESULTS_RECEIVED':
      return state.filter(item => item.data).concat(action.results);
    case 'RESULTS_CLEAR':
      return [];
    default:
      return state;
  }
};

export const charts = (state, action) => {
  if (state === undefined) {
    return {};
  }
  const newState = { ...state }; 
  switch (action.type) {
    case 'CHARTS_ADD':
      newState[action.chartObject.id] = action.chartObject;
      break;
    case 'CHARTS_SET':
      return action.charts;
    case 'CHARTS_DELETE':
      delete newState[action.chartObject.id];
      break;
    default:
      return state;
  }
  return newState;
};

export const favourites = (state, action) => {
  if (state === undefined) {
    return {};
  }
  const newState = { ...state };
  switch (action.type) {
    case 'FAVOURITES_ADD':
      newState[action.id] = action.chartObject;
      break;
    case 'FAVOURITES_DELETE':
      delete newState[action.id];
      break;
    case 'FAVOURITES_SET':
      return action.favourites;
    default:
      return state;
  }
  return newState;
};

export const boards = (state, action) => {
  if (state === undefined) {
    return {};
  }
  const newState = { ...state };
  const newBoardState = { ...state[action.boardName] };
  switch (action.type) {
    case 'BOARD_CREATE':
      if (!newState[action.boardName]) {
        newState[action.boardName] = {
          columnNames: ['Yes', 'Maybe', 'Interesting'],
          charts: {},
        };
      }
      break;
    case 'BOARD_DELETE':
      delete newState[action.boardName];
      break;
    case 'BOARDS_SET':
      return action.boards;
    case 'BOARD_MOVE_COLUMN':
      newState[action.boardName] = {
        ...newBoardState,
        charts: newBoardState.charts.map(item => (item.id === action.id ? { ...item, colIndex: action.toColumn } : item)),
      };
      break;
    case 'BOARD_NAME_COLUMN':
      const newColumns = newBoardState.columnNames.map(column => (column === action.oldName ? action.newName : column));
      newState[action.boardName] = { ...newBoardState, columnNames: newColumns };
      break;
    case 'BOARD_CHART_ADD':
      newState[action.boardName].charts = newBoardState.charts.concat({ id: action.id, colIndex: 0 });
      break;
    case 'BOARD_CHART_DELETE':
      newState[action.boardName].charts = newBoardState.charts.filter(item => item.id !== action.id);
      break;
    default:
      return state;
  }
  return newState;
};

const user = (state, action) => {
  if (state === undefined) {
    return null;
  }
  switch (action.type) {
    case ('LOGIN'):
      return action.user;
    case ('LOGOUT'):
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  results,
  charts,
  favourites,
  boards,
  user,
});
