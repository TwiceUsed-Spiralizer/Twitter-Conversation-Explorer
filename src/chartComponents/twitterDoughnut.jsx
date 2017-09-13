import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  const data = props.data;
  console.log(props.data);
  const womenPercent = (data.femaleSorry / data.female) * 100;
  const menPercent = (data.maleSorry / data.male) * 100;
  const total = womenPercent + menPercent;
  const womenLength = (womenPercent / total) * 600;
  const menLength = (menPercent / total) * 600;
  return <Doughnut data={{ datasets: [{ data: [womenLength, menLength], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} />;
};

export default TwitterDoughnut;
