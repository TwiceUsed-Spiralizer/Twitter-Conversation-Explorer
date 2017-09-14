import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

const ChiSquared = (props) => {
  const data = [{
    name: 'Tanner Linsley',
    age: 26,
    chi_squared: 'keyword',
    chi_squared: 'not keyword',
  }];

  const columns = [{
    Header: 'Chi Squared',
    id: 'chi_squared',
    accessor: a => a.chi_squared,
  },
  {
    Header: 'Male',
    accessor: 'male',
  }, {
    Header: 'Female',
    accessor: 'female',
  }];

  console.log(props.data);
  return (<ReactTable
    data={data}
    noDataText="Oh Noes!"
    showPagination={false}
    resizable={false}
    defaultPageSize={2}
    columns={columns}
    className="-striped -highlight"
  />);
};

export default ChiSquared;
