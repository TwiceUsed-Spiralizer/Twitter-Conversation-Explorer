import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TwitterDoughnut = (props) => {
  if (props.data.keyword === 0) {
    return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
   }  

  const dataFromProps = props.data;
  const categoryATotal = dataFromProps[`aaa_${props.params.dataNameA}`];
  const categoryAandKeyword = dataFromProps[`aaa_${props.params.dataNameA}&keyword`];
  const categoryBTotal = dataFromProps[`bbb_${props.params.dataNameB}`];
  const categoryBandKeyword = dataFromProps[`bbb_${props.params.dataNameB}&keyword`];

  const categoryAPercent = (categoryAandKeyword / categoryATotal) * 100;
  const categoryBPercent = (categoryBandKeyword / categoryBTotal) * 100;
  return (<Doughnut options={props.options} data={{ datasets: [{ data: [categoryAPercent, categoryBPercent], backgroundColor: ['#4484CE', '#F19F4D'] }], labels: [props.params.columnA, props.params.columnB] }} />);
};

export default TwitterDoughnut;
