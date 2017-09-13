import React from 'react';

const TwitterDoughnut = (props) => {
  <Doughnut data={{ datasets: [{ data: [props.data.womenLength, props.data.menLength], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} />;
};

export default TwitterDoughnut;
