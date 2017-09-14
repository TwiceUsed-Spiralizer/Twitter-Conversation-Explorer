import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import chiSquaredCalc from '../utils/chiSquared';

const ChiSquared = (props) => {
  const dataFromProps = props.data;
  const chiSquaredData = {
    maleKeyword: dataFromProps[3].doc_count,
    maleNotKeyword: dataFromProps[4].doc_count - dataFromProps[3].doc_count,
    femaleKeyword: dataFromProps[1].doc_count,
    femaleNotKeyword: dataFromProps[0].doc_count - dataFromProps[1].doc_count,
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
    chi_squared: 'keyword',
  },
  {
    male: chiSquaredData.maleNotKeyword,
    female: chiSquaredData.femaleNotKeyword,
    chi_squared: 'not keyword',
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
  },];

  console.log(props.data);
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
