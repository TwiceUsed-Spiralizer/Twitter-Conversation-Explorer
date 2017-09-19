import React from 'react';
import Slider from 'react-slick';
import { Button, CardPanel } from 'react-materialize';
import { connect } from 'react-redux';
import firebase from '../firebase';
import './QueryResults.css';
import ChartComponent from '../chartComponents';
import CarouselChart from '../chartWrappers/CarouselChart';

const PrevButton = (props) => {
  return (
    <Button floating large icon="arrow_back" id="carousel-prev" className="red" onClick={props.onClick} />
  );
};

const NextButton = (props) => {
  return (
    <Button floating large icon="arrow_forward" id="carousel-next" className="red" onClick={props.onClick} />
  );
};

const QueryResults = (props) => {
  return props.results.length
    ? (
      <div id="results-carousel">
        <Slider adaptiveHeight={false} dots prevArrow={<PrevButton />} nextArrow={<NextButton />} >
          {
            props.results.map(ChartComponent(CarouselChart(props.favouriteItem)))
          }
        </Slider>
      </div>
    )
    : (
      <CardPanel><h2 className="center-align">Welcome to TweetInsight</h2></CardPanel>
    );
};

const mapStateToProps = state => ({
  results: state.results.map(item => state.favourites.has(item.id) ? { ...item, favourited: true } : item),
});

const mapDispatchToProps = dispatch => ({
  favouriteItem: (chartObject) => {
    const user = firebase.auth().currentUser;
    firebase.database().ref(`/favourites/${user.uid}`).push(chartObject);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
