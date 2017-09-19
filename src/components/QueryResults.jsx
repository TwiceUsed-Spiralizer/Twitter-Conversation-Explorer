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
  results: state.results,
});

const mapDispatchToProps = (dispatch) => {
  return {
    favouriteItem: (chartObject) => {
      if (chartObject.id) {
        firebase.database().ref(`/charts/${firebase.auth().currentUser.uid}/${chartObject.id}/favourited`).set(true)
          .then(() => {
            dispatch({
              type: 'RESULTS_CHANGE',
              index: chartObject.resultsIndex,
              chartObject: {
                ...chartObject,
                favourited: true,
              },
            });
          });
      } else {
        const { resultsIndex, ...restOfObject } = { ...chartObject, favourited: true };
        firebase.database().ref(`/charts/${firebase.auth().currentUser.uid}`).push(restOfObject)
          .then(item => dispatch({
            type: 'RESULTS_CHANGE',
            index: chartObject.resultsIndex,
            chartObject: {
              ...chartObject,
              id: item.key,
              favourited: true,
            },
          }));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
