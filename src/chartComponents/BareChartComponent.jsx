import React from 'react';
import { Preloader, Container } from 'react-materialize';

import TwitterDoughnut from './twitterDoughnut';
import ChiSquared from './chiSquared';
import TCELineGraph from './lineGraph';
import TCEHistogram from './histogram';

export default (chartObject) => {
  if (!chartObject.data) {
    return <Container><Preloader size="big" flashing /></Container>;
  }
  let Chart;
  switch (chartObject.type) {
    case 'doughnut':
      Chart = TwitterDoughnut;
      break;
    case 'line':
      Chart = TCELineGraph;
      break;
    case 'histogram':
      Chart = TCEHistogram;
      break;
    case 'chiSquared':
      Chart = ChiSquared;
      break;
    default:
      return null;
  }
  return (<Chart options={{ maintainAspectRatio: false, animation: false }} keyword={chartObject.keyword} data={chartObject.data} params={chartObject.params}/>);
};
