import React from 'react';
import Slider from 'react-slick';
import './QueryResults.css';
import ChartComponent from './chartComponents';
import CarouselChart from './ChartWrappers/CarouselChart';

export default (props) => {
  console.log(props);
  const chartWrapper = CarouselChart(props.moveToBoard);
  return (
    <div id="results-carousel">
      <Slider adaptiveHeight={false} autoplay={true} dots={true} arrows={false} >
        {
          props.results.map(ChartComponent(chartWrapper))
        }
      </Slider>
    </div>
  );
};
