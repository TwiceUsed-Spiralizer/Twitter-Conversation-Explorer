import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-materialize';
import ChartComponent from '../chartComponents';

const Favourites = props => (
  <div>
    {props.favourites.map(ChartComponent(Card))}
  </div>
);

const mapStateToProps = state => ({
  favourites: Array.from(state.favourites).map(key => state.charts[key]),
});

export default connect(mapStateToProps)(Favourites);
