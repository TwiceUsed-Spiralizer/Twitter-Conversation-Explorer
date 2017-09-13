import React from 'react';

export default props =>
  (
    <div className="hoverable">
      {JSON.stringify(props.data)}
    </div>
  );
