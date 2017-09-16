import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import './QueryResults.css';
import ChartComponent from '../chartComponents';
import CarouselChart from '../chartWrappersOLD/CarouselChart';

let counter = 0;

const PrevButton = (props) => {
  return (
    <Button floating large icon="arrow_back" id="carousel-prev" className="red" style={props.style} onClick={props.onClick} />
  );
};

const NextButton = (props) => {
  return (
    <Button floating large icon="arrow_forward" id="carousel-next" className="red" style={props.style} onClick={props.onClick} />
  );
};

const QueryResults = (props) => {
  return (
    <div id="results-carousel">
      <Slider adaptiveHeight={false} dots={true} prevArrow={<PrevButton />} nextArrow={<NextButton />} >
        {
          props.results.map(ChartComponent(CarouselChart(props.favouriteItem)))
        }
      </Slider>
    </div>
  );
};

const mapStateToProps = state => ({
  results: state.results,
});

const mapDispatchToProps = dispatch => ({
  favouriteItem: (chartToSave) => {
    const chartObject = { ...chartToSave, id: counter++ };
    dispatch({
      type: 'CHARTS_ADD',
      chartObject,
    });
    dispatch({
      type: 'FAVOURITES_ADD',
      id: chartObject.id,
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryResults);
