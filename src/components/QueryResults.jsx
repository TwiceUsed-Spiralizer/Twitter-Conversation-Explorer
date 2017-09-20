import React from 'react';
import Slider from 'react-slick';
import { Button, CardPanel } from 'react-materialize';
import { connect } from 'react-redux';
import firebase from '../firebase';
import embed from '../firebase/embed';
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

class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.results.length) {
      this.setState({
        animation: false,
      });
    } else {
      this.setState({
        animation: true,
      });
    }
  }

  render() {
    return this.props.results.length
      ? (
        <div id="results-carousel">
          <Slider adaptiveHeight={false} dots prevArrow={<PrevButton />} nextArrow={<NextButton />} >
            {
              this.props.results.map(ChartComponent(CarouselChart(this.props.favouriteItem, this.props.embedItem, this.props.user), this.state.animation))
            }
          </Slider>
        </div>
      )
      : (
        <CardPanel><h2 className="center-align">Welcome to TweetInsight</h2></CardPanel>
      );
  }
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
            changeResults({ ...chartObject, favourited: true })
          );
      } else {
        const { resultsIndex, ...restOfObject } = { ...chartObject, favourited: true };
        firebase.database().ref(`/charts/${firebase.auth().currentUser.uid}`).push(restOfObject)
          .then(item => 
            changeResults({ ...chartObject, id: item.key, favourited: true })
          );
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
