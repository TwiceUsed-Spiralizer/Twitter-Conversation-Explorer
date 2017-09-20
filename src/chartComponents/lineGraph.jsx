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
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: allDataFormatted,
      },
    ],
  };
  return <Line options={{ maintainAspectRatio: false, animation: false }} data={data} />;
};

export default TCELineGraph;
