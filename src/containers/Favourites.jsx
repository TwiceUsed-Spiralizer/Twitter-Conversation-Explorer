import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-materialize';
import ChartComponent from '../chartComponents';

const Favourites = props => (
<<<<<<< 4a4eaa53e01e926242a2ea956172e5380656172f
  <div>
    {props.favourites.map(ChartComponent(Card))}
  </div>
=======
  <Row>
    {props.favourites.map(ChartComponent(FavouritesChart(props.unfavourite, props.pinToBoard)))}
  </Row>
>>>>>>> Add style and defavourite handler to Favourites
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
    && dispatch({ type: 'BOARD_ADD_CHART', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
