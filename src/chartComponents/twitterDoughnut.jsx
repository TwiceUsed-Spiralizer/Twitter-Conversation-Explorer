import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  if (props.data.keyword === 0) {
    return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
   }  

<<<<<<< ac20bffc235f992b63390c44d279854351e276bf
  const womenPercent = (totalFemaleSenderTweetsWithKeyword.doc_count / totalFemaleSenderTweets.doc_count) * 100;
  const menPercent = (totalMaleSenderTweetsWithKeyword.doc_count / totalMaleSenderTweets.doc_count) * 100;
  return (<Doughnut options={props.options} data={{ datasets: [{ data: [womenPercent, menPercent], backgroundColor: ['#F9CF00', '#F19F4D'] }], labels: ['Women', 'Men'] }} />);
=======
  const dataFromProps = props.data;
  const categoryATotal = dataFromProps[`aaa_${props.params.dataNameA}`];
  const categoryAandKeyword = dataFromProps[`aaa_${props.params.dataNameA}&keyword`];
  const categoryBTotal = dataFromProps[`bbb_${props.params.dataNameB}`];
  const categoryBandKeyword = dataFromProps[`bbb_${props.params.dataNameB}&keyword`];

  const categoryAPercent = (categoryAandKeyword / categoryATotal) * 100;
  const categoryBPercent = (categoryBandKeyword / categoryBTotal) * 100;
  return (<Doughnut options={props.options} data={{ datasets: [{ data: [categoryAPercent, categoryBPercent], backgroundColor: ['blue', 'hotpink'] }], labels: [props.params.columnA, props.params.columnB] }} />);
>>>>>>> Working doughtnut charts
};

export default TwitterDoughnut;
