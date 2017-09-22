import React from 'react';
import { Modal, Button, Input } from 'react-materialize';
import firebase from '../firebase';

export default props => (
  <Modal
    trigger={props.trigger}
    header={`Rename ${props.boardName}?`}
    actions={[
      <Button flat className="light" onClick={props.delete} style={{ marginLeft: '5px', marginRight: '5px' }}>Rename</Button>,
      <Button modal="close" flat>Cancel</Button>,
    ]}
  >
    <Input icon="dashboard" label="Enter new name" />
  </Modal>
);
