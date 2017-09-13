import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  // console.log(props.data);
  const womenPercent = (props.data[1].doc_count / props.data[0].doc_count) * 100;
  const menPercent = (props.data[3].doc_count / props.data[4].doc_count) * 100;
  return <Doughnut data={{ datasets: [{ data: [womenPercent, menPercent], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} width="40" height="60" />;
};

export default TwitterDoughnut;
