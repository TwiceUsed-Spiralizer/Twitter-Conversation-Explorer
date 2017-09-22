import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const TCELineGraph = (props) => {
  if (props.data.length === 0) { return (<div> Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>); }  
  const allDatesFormatted = props.data.map(obj => moment(obj.key).fromNow());
  const allDataFormatted = props.data.map(obj => obj.doc_count);
  const data = {
    labels: allDatesFormatted,
    datasets: [
      {
        label: 'Tweets For Keyword By Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#F9CF00',
        borderColor: '#F19F4D',
        pointBorderColor: '#F9CF00',
        pointBackgroundColor: '#F9CF00',
        pointBorderWidth: 0.5,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#4484CE',
        pointHoverBorderColor: '#4484CE',
        pointHoverBorderWidth: 5,
        pointRadius: 1,
        pointHitRadius: 10,
        data: allDataFormatted,
      },
    ],
  };
  return <Line options={props.options} data={data} />;
};

export default TCELineGraph;
