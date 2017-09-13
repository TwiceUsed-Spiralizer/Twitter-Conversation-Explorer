import React from 'react';
import { Preloader, Container, Icon } from 'react-materialize';

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
        return <Wrapper icon={chartObject.icon} title={<Icon left>{chartObject.icon}</Icon>}><TwitterDoughnut data={chartObject.data} /></Wrapper>;
      case 'line':
        return <Wrapper icon={chartObject.icon} title={<Icon left>{chartObject.icon}</Icon>}><LineGraph data={chartObject.data} /></Wrapper>;
      case 'histogram':
        return <Wrapper icon={chartObject.icon} title={<Icon left>{chartObject.icon}</Icon>}><Histogram data={chartObject.data} /></Wrapper>;
      case 'chiSquared':
        return <Wrapper icon={chartObject.icon} title={<Icon left>{chartObject.icon}</Icon>}><ChiSquared data={chartObject.data} /></Wrapper>;
      default:
        return null;
    }
  }
}
