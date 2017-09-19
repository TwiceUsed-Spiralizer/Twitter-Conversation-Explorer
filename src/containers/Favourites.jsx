import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import ChartComponent from '../chartComponents';
import FavouritesChart from '../chartWrappers/FavouritesChart';
import BoardPinModal from '../components/BoardPinModal';


const Favourites = props => (
  <Row>
    {props.favourites.map(ChartComponent(FavouritesChart(props.unfavourite, BoardPinModal)))}
  </Row>
);

const mapStateToProps = state => ({
  favourites: Array.from(state.favourites).map(key => state.charts[key]),
  boardNames: Object.keys(state.boards),
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
