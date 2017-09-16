import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import './QueryResults.css';
import ChartComponent from '../chartComponents';
import CarouselChart from '../chartWrappers/CarouselChart';

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
          props.results.map(ChartComponent(CarouselChart()))
        }
      </Slider>
    </div>
  );
};

const mapStateToProps = state => ({
  results: state.results,
});

export default connect(mapStateToProps)(QueryResults);
