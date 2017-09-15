import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-materialize';
import './QueryResults.css';
// import ChartComponent from '../chartComponents';
// import CarouselChart from '../chartWrappers/CarouselChart';

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
  return (
    <div id="results-carousel">
      <Slider adaptiveHeight={false} dots={true} prevArrow={<PrevButton />} nextArrow={<NextButton />} >
        {
          ['text', 'for', 'now'].map(item => <div>{item}</div>)
        }
      </Slider>
    </div>
  );
};
