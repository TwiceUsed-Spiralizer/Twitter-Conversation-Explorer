import React from 'react';
import { connect } from 'react-redux';
// import { Card } from 'react-materialize';
// import ChartComponent from '../chartComponents';

const Board = props => (
  <div>
    HELLO
    {console.log(props)}
    {/* {props.boards.map(ChartComponent(Card))} */}
  </div>
);

const mapStateToProps = (state, props) => ({
  print: console.log(state.boards),
  // board: state.boards[props.match.params.boardName].map(key => state.charts[key]),
});

export default connect(mapStateToProps)(Board);

