import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  if (props.data.length === 2) { return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>); }  
  const totalFemaleSenderTweets = props.data[0];
  const totalFemaleSenderTweetsWithKeyword = props.data[1];
  const totalMaleSenderTweetsWithKeyword = props.data[3];
  const totalMaleSenderTweets = props.data[4];

  const womenPercent = (totalFemaleSenderTweetsWithKeyword.doc_count / totalFemaleSenderTweets.doc_count) * 100;
  const menPercent = (totalMaleSenderTweetsWithKeyword.doc_count / totalMaleSenderTweets.doc_count) * 100;
  return (<Doughnut options={{ maintainAspectRatio: false, animation: false }} data={{ datasets: [{ data: [womenPercent, menPercent], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} />);
};

export default TwitterDoughnut;
