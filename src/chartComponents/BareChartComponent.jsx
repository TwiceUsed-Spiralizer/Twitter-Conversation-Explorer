import React from 'react';
import { Preloader, Container } from 'react-materialize';

import TwitterDoughnut from './twitterDoughnut';
import ChiSquared from './chiSquared';
import LineGraph from './lineGraph';
import Histogram from './histogram';

export default  (chartObject) => {
  if (!chartObject.data) {
    return <Container><Preloader size="big" flashing /></Container>;
  }
  let Chart;
  switch (chartObject.type) {
    case 'doughnut':
      Chart = TwitterDoughnut;
      break;
    case 'line':
      Chart = LineGraph;
      break;
    case 'histogram':
      Chart = Histogram;
      break;
    case 'chiSquared':
      Chart = ChiSquared;
      break;
    default:
      return null;
  }
  return (<Chart data={chartObject.data} />);
};
