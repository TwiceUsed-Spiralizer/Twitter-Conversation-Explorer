import React from 'react';
import { Bar } from 'react-chartjs-2';

const TCEHistogram = (props) => {
  // for(var i = 0; i < props.data.length; i++){
  //   props.data.buckets[i].gender.buckets;
  // }

  const data = {
    labels: ['0-100', '101-1000', '1001-10,000', '10,001-100,000', '100,001-1,000,000', '1,000,000+'],
    datasets: [
      {
        label: 'Women',
        backgroundColor: 'rgba(104, 142, 234,0.2)',
        borderColor: 'rgba(104, 142, 234,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(104, 142, 234,0.4)',
        hoverBorderColor: 'rgba(104, 142, 234,1)',
        data: [props.data.buckets[0].gender.buckets[2].doc_count, 100, 100, 100, 100, 100, 100],
      },
      {
        label: 'Men',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ],
  };
  console.log(props.data);
  return <Bar data={data} width="40" height="60" />;
  //return <div>JSON.stringify(props.data)</div>
};

export default TCEHistogram;
