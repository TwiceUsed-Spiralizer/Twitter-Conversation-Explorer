import React from 'react';
import { Preloader, Container } from 'react-materialize';

import TwitterDoughnut from './twitterDoughnut';
import ChiSquared from './chiSquared';
import TCELineGraph from './lineGraph';
import TCEHistogram from './histogram';

export default (Wrapper, animation) => {
  console.log('anim', animation)
  
  return (chartObject, index) => {
    if (!chartObject.data) {
      return <Wrapper key={index}><Container><Preloader size="big" flashing /></Container></Wrapper>;
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
    const options = animation ? { maintainAspectRatio: false } : { maintainAspectRatio: false, animation };
    return (<Wrapper
      icon={chartObject.icon}
      title={chartObject.title}
      index={index}
      id={chartObject.id}
      key={chartObject.id}
      chartObject={chartObject}
    >
      <Chart options={options} data={chartObject.data} />
    </Wrapper>);
  };
};
