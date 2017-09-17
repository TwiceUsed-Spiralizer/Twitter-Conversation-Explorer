import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-materialize';
import ChartComponent from '../chartComponents';

const Board = props => (
  <div>
    {props.boards.map(ChartComponent(Card))}
  </div>
);

const mapStateToProps = state => ({
  boards: state.boards.map(key => state.charts[key]),
});

export default connect(mapStateToProps)(Board);

