import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-materialize';
import './QueryResults.css';
import ChartComponent from './chartComponents';
import CarouselChart from './ChartWrappers/CarouselChart';

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

export default (props) => {
  if (!props.results.length) {
    return (<div id="results-placeholder">
      <h1>Welcome to TweetInsight</h1>
  </div>);
  }
  const chartWrapper = CarouselChart(props.moveToBoard);
  return (
    <div id="results-carousel">
      <Slider adaptiveHeight={false} dots={true} prevArrow={<PrevButton />} nextArrow={<NextButton />} >
        {
          props.results.map(ChartComponent(chartWrapper))
        }
      </Slider>
    </div>
  );
};

//       <div style={{ height: '450px', width: '80%' }}>
