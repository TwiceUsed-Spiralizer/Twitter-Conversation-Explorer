import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import chiSquaredCalc from '../utils/chiSquared';

const ChiSquared = (props) => {
  if (props.data.length === 2) {
    (<div>Sorry, there are no tweets with the keyword {props.keyword} in our database!</div>);
  }
  const dataFromProps = props.data;
  const maleKeyword = dataFromProps[3] ? dataFromProps[3].doc_count : 0;
  const femaleKeyword = dataFromProps[1] ? dataFromProps[1].doc_count : 0;
  const maleTotal = dataFromProps[4] ? dataFromProps[4].doc_count : dataFromProps[1].doc_count;
  const femaleTotal = dataFromProps[0].doc_count;
  const chiSquaredData = {
    maleKeyword,
    maleNotKeyword: maleTotal - maleKeyword,
    femaleKeyword,
    femaleNotKeyword: femaleTotal - femaleKeyword,
  };
  const p = chiSquaredCalc({
    a1: chiSquaredData.maleKeyword,
    a2: chiSquaredData.femaleKeyword,
    b1: chiSquaredData.maleNotKeyword,
    b2: chiSquaredData.femaleNotKeyword,
  });
  const data = [{
    male: chiSquaredData.maleKeyword,
    female: chiSquaredData.femaleKeyword,
    chi_squared: `Uses '${props.keyword}'`,
  },
  {
    male: chiSquaredData.maleNotKeyword,
    female: chiSquaredData.femaleNotKeyword,
    chi_squared: `Does not use '${props.keyword}'`,
  },
  {
    chi_squared: `p: ${p}`,
    male: '',
    female: '',
  }];

  const columns = [{
    Header: 'Chi Squared',
    id: 'chi_squared',
    accessor: a => a.chi_squared,
  },
  {
    Header: 'Female',
    id: 'female',
    accessor: f => f.female.toLocaleString(),
  },
  {
    Header: 'Male',
    id: 'male',
    accessor: m => m.male.toLocaleString(),
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
