import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';

const BoardDeleteModal = props => (
  <Modal
    trigger={props.trigger}
    header={`Are you sure you wish to delete ${props.boardName}?`}
    actions={[
      <Button className="btn-flat modal-action red" modal="close" onClick={props.delete} style={{ marginLeft: '5px', marginRight: '5px' }}>Delete</Button>,
      <Button modal="close" flat>Cancel</Button>,
    ]}
  >
    This action is not reversible.
  </Modal>
);

BoardDeleteModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  boardName: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired,
}

export default BoardDeleteModal;
