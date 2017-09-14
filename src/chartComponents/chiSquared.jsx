import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

const ChiSquared = (props) => {
  const data = [{
    male: props.data[3].doc_count,
    female: props.data[1].doc_count,
    chi_squared: 'keyword',
  },
  {
    male: props.data[4].doc_count - props.data[3].doc_count,
    female: props.data[0].doc_count - props.data[1].doc_count,
    chi_squared: 'not keyword',
  }];

  const columns = [{
    Header: 'Chi Squared',
    id: 'chi_squared',
    accessor: a => a.chi_squared,
  },
  {
    Header: 'Female',
    id: 'female',
    accessor: f => f.female,
  },
  {
    Header: 'Male',
    id: 'male',
    accessor: m => m.male,
  },];

  console.log(props.data);
  return (<ReactTable
    data={data}
    showPagination={false}
    resizable={false}
    defaultPageSize={2}
    columns={columns}
    className="-striped -highlight"
  />);
};

export default ChiSquared;
