import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import chiSquaredCalc from '../utils/chiSquared';

const ChiSquared = (props) => {
  if (props.data.length === 2) {
 return (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
  }
  const dataFromProps = props.data;

  const categoryATotal = dataFromProps[0] ? dataFromProps[0].doc_count : 0;
  const categoryAandKeyword = dataFromProps[1] ? dataFromProps[1].doc_count : 0;
  const categoryBTotal = dataFromProps[2] ? dataFromProps[2].doc_count : 0;
  const categoryBandKeyword = dataFromProps[3] ? dataFromProps[3].doc_count : 0;

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
    Header: `${props.columnA}`,
    id: 'female',
    accessor: f => f.categoryA.toLocaleString(),
  },
  {
    Header: `${props.columnB}`,
    id: 'male',
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
