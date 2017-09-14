import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const TCELineGraph = (props) => {
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
  console.log(props);
  return <Line options={{ maintainAspectRatio: false }} data={data} />;
};

export default TCELineGraph;
