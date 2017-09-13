import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  console.log(props.data);

  const womenPercent = (props.data[1].doc_count / props.data[0].doc_count) * 100;
  const menPercent = (props.data[3].doc_count / props.data[4].doc_count) * 100;
  const total = womenPercent + menPercent;
  const womenLength = (womenPercent / total) * 600;
  const menLength = (menPercent / total) * 600;
  return <Doughnut data={{ datasets: [{ data: [womenLength, menLength], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} />;
};

export default TwitterDoughnut;
