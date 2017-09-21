import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import chiSquaredCalc from '../utils/chiSquared';

const ChiSquared = (props) => {
  if (props.data.keyword === 0) {
 return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
}
  const dataFromProps = props.data;
  const categoryATotal = dataFromProps[`aaa_${props.params.dataNameA}`];
  const categoryAandKeyword = dataFromProps[`aaa_${props.params.dataNameA}&keyword`];
  const categoryBTotal = dataFromProps[`bbb_${props.params.dataNameB}`];
  const categoryBandKeyword = dataFromProps[`bbb_${props.params.dataNameB}&keyword`];

  const chiSquaredData = {
    categoryAandKeyword,
    categoryANotKeyword: categoryATotal - categoryAandKeyword,
    categoryBandKeyword,
    categoryBNotKeyword: categoryBTotal - categoryBandKeyword,
  };

  const p = chiSquaredCalc({
    a1: chiSquaredData.categoryBandKeyword,
    a2: chiSquaredData.categoryAandKeyword,
    b1: chiSquaredData.categoryBNotKeyword,
    b2: chiSquaredData.categoryANotKeyword,
  });
  
  const data = [{
    categoryA: chiSquaredData.categoryAandKeyword,
    categoryB: chiSquaredData.categoryBandKeyword,
    chi_squared: `Uses '${props.keyword}'`,
  },
  {
    categoryA: chiSquaredData.categoryANotKeyword,
    categoryB: chiSquaredData.categoryBNotKeyword,
    chi_squared: `Does not use '${props.keyword}'`,
  },
  {
    chi_squared: `p: ${p}`,
    categoryA: '',
    categoryB: '',
  }];
  
  const columns = [{
    Header: 'Chi Squared',
    id: 'chi_squared',
    accessor: a => a.chi_squared,
  },
  {
    Header: `${props.params.columnA}`,
    id: `${props.params.columnA}`,
    accessor: f => f.categoryA.toLocaleString(),
  },
  {
    Header: `${props.params.columnB}`,
    id: `${props.params.columnB}`,
    accessor: m => m.categoryB.toLocaleString(),
  }];

  return (<ReactTable
    data={data}
    showPagination={false}
    resizable={false}
    defaultPageSize={3}
    columns={columns}
    className="-striped -highlight"
  />);
};

export default ChiSquared;
