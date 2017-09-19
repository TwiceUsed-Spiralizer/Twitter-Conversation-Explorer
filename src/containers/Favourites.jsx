import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import firebase from '../firebase';
import ChartComponent from '../chartComponents';
import FavouritesChart from '../chartWrappers/FavouritesChart';
import BoardPinModal from '../components/BoardPinModal';

const Favourites = props => (
  <Row>{console.log(props.favourites)}
    {props.favourites.map(ChartComponent(FavouritesChart(id => firebase.database().ref(`/favourites/${props.user.uid}/${id}`).remove(), BoardPinModal)))}
  </Row>
);

const mapStateToProps = state => ({
  favourites: Object.keys(state.favourites).map(key => ({ ...state.favourites[key], id: key })),
  boardNames: Object.keys(state.boards),
  user: state.user,
  boardContents: state.boards,
});

const mapDispatchToProps = (dispatch, props) => ({
  unfavourite: id => dispatch({ type: 'FAVOURITES_DELETE', id }),
  pinToBoard: (id, boardName) =>
    props.boardNames.includes(boardName)
    && !props.boardContents[boardName].includes(id)
    && dispatch({ type: 'BOARD_CHART_ADD', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
