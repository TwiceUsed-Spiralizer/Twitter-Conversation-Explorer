import React from 'react';
import { Bar } from 'react-chartjs-2';

const TCEHistogram = (props) => {
  const data = props.data;
  const arrayOfDataForCategoryA = [];
  const arrayOfDataForCategoryB = [];

  const arrayOfFollowerRanges = Object.keys(data);
  arrayOfFollowerRanges.forEach((key) => {
    arrayOfDataForCategoryA.push(data[key][props.params.dataNameA]);
    arrayOfDataForCategoryB.push(data[key][props.params.dataNameB]);
  });

  const allZeroes = array => array.every(item => item === 0);
  if (allZeroes(arrayOfDataForCategoryA.concat(arrayOfDataForCategoryB))) {
    return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
  }

  const dataForGraph = {
    labels: ['0-100', '101-1000', '1001-10,000', '10,001-100,000', '100,001-1,000,000', '1,000,000+'],
    datasets: [
      {
        label: `${props.params.columnA}`,
        backgroundColor: '#4484CE',
        borderColor: '#f5fcff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(104, 142, 234,0.4)',
        hoverBorderColor: 'rgba(104, 142, 234,1)',
        data: arrayOfDataForCategoryA,
      },
      {
        label: `${props.params.columnB}`,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: arrayOfDataForCategoryB,
      },
    ],
  };
  return (<Bar options={props.options} data={dataForGraph} />);
};

export default TCEHistogram;
