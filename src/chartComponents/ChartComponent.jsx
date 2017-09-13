import React from 'react';
import { Preloader, Container } from 'react-materialize';

import TwitterDoughnut from './twitterDoughnut';
import ChiSquared from './chiSquared';
import LineGraph from './lineGraph';
import Histogram from './histogram';

export default (Wrapper) => {
  return (chartObject) => {
    if (!chartObject.data) {
      return <Wrapper><Container><Preloader size="big" flashing /></Container></Wrapper>;
    }
    switch (chartObject.type) {
      case 'doughnut':
        return <Wrapper><TwitterDoughnut data={chartObject.data} /></Wrapper>;
      case 'line':
        return <Wrapper><LineGraph data={chartObject.data} /></Wrapper>;
      case 'histogram':
        return <Wrapper><Histogram data={chartObject.data} /></Wrapper>;
      case 'chiSquared':
        return <Wrapper><ChiSquared data={chartObject.data} /></Wrapper>;
      default:
        return null;
    }
  }
}
