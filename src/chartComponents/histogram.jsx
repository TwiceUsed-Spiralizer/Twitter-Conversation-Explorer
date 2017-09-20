import React from 'react';
import { Bar } from 'react-chartjs-2';

const TCEHistogram = (props) => {
  console.log(props.data);
  const arrayOfDataForFemales = props.data.buckets.map(el => (el.gender.buckets[2] ? el.gender.buckets[2].doc_count : 0));
  const arrayOfDataForMales = props.data.buckets.map(el => (el.gender.buckets[1] ? el.gender.buckets[1].doc_count : 0));
  const allZeroes = (array) => {
    return array.every(item => item === 0);
  }
  if (allZeroes(arrayOfDataForMales.concat(arrayOfDataForFemales))) {
    return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
  }

  const dataForGraph = {
    labels: ['0-100', '101-1000', '1001-10,000', '10,001-100,000', '100,001-1,000,000', '1,000,000+'],
    datasets: [
      {
        label: 'Women',
        backgroundColor: 'rgba(104, 142, 234,0.2)',
        borderColor: 'rgba(104, 142, 234,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(104, 142, 234,0.4)',
        hoverBorderColor: 'rgba(104, 142, 234,1)',
        data: arrayOfDataForFemales,
      },
      {
        label: 'Men',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: arrayOfDataForMales,
      },
    ],
  };
  return (<Bar data={dataForGraph} options={{ maintainAspectRatio: false, animation: false }} />);
};

export default TCEHistogram;
