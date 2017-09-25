import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button, Col, Row, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { chartObject } from '../utils/propTypes';
import firebase from '../firebase';
import embed from '../firebase/embed';
import './QueryResults.css';
import ChartComponent from '../chartComponents';
import CarouselChart from '../chartWrappers/CarouselChart';

const PrevButton = props => (
  <Button floating large icon="arrow_back" id="carousel-prev" className="tangerine" onClick={props.onClick} />
);

const NextButton = props => (
  <Button floating large icon="arrow_forward" id="carousel-next" className="tangerine" onClick={props.onClick} />
);

const QueryResults = props =>
  (
    props.results.length
      ? (
        <div id="results-carousel">
          <Slider adaptiveHeight={false} dots prevArrow={<PrevButton />} nextArrow={<NextButton />} >
            {
              props.results.map(ChartComponent(CarouselChart(props.favouriteItem, props.embedItem, props.user), false))
            }
          </Slider>
        </div>
      )
      : (
        <div>
          <Row className="center valign-wrapper" style={{ paddingTop: '200px' }}>
            <Col m={4} >
              <Icon large center className="tangerine-text">search</Icon>
              <h3 className="center-align cerulean-text"> Search </h3>
              <p> Search from our database of 6+ million tweets </p>
            </Col>
            <Col m={4} >
              <Icon large center className="tangerine-text">visibility</Icon>
              <h3 className="center-align cerulean-text" > Discover </h3>
              <p> Discover and analyze the Twitter status quo </p>
            </Col>
            <Col m={4} >
              <Icon large center className="tangerine-text">share</Icon>
              <h3 className="center-align cerulean-text" > Share </h3>
              <p> Share your compelling insights on any platform </p>
            </Col>
          </Row>
        </div>
      )
  );

QueryResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape(chartObject)).isRequired,
  user: PropTypes.object,
  favouriteItem: PropTypes.func.isRequired,
  embedItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  results: state.results,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  const changeResults = chartObject =>
    dispatch({
      type: 'RESULTS_CHANGE',
      chartObject,
      index: chartObject.resultsIndex,
    });
  return {
    embedItem: (chartObject) => {
      embed(chartObject)
        .then((embedId) => {
          changeResults({ ...chartObject, embedId });
        });
    },
    favouriteItem: (chartObject) => {
      if (chartObject.id) {
        firebase.database().ref(`/charts/${firebase.auth().currentUser.uid}/${chartObject.id}/favourited`).set(true)
          .then(() =>
            changeResults({ ...chartObject, favourited: true }),
          );
      } else {
        const { resultsIndex, ...restOfObject } = { ...chartObject, favourited: true };
        firebase.database().ref(`/charts/${firebase.auth().currentUser.uid}`).push(restOfObject)
          .then(item =>
            changeResults({ ...chartObject, id: item.key, favourited: true }),
          );
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
