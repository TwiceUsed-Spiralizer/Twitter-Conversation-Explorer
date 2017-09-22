import React from 'react';
import { Modal, Button } from 'react-materialize';

export default props => (
  <Modal
    trigger={props.trigger}
    header={`Are you sure you wish to delete ${props.boardName}?`}
    actions={[
      <Button className="btn-flat modal-action red" onClick={props.delete} style={{ marginLeft: '5px', marginRight: '5px' }}>Delete</Button>,
      <Button modal="close" flat>Cancel</Button>,
    ]}
  >
    This action is not reversible.
  </Modal>
);
