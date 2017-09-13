import React from 'react';

export default (props) => {
  return (
    <div className="hoverable">
      {JSON.stringify(props.data)}
    </div>
  )
}
