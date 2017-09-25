import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'react-materialize';

class BoardRenameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
    };
    this.rename = this.rename.bind(this);
  }

  rename() {
    this.props.rename(this.state.newName);
  }

  render() {
    return (
      <Modal
        trigger={this.props.trigger}
        header={`Rename ${this.props.boardName}?`}
        actions={[
          <Button flat modal="close" className="light" onClick={this.rename} style={{ marginLeft: '5px', marginRight: '5px' }}>Rename</Button>,
          <Button modal="close" flat>Cancel</Button>,
        ]}
      >
        <Input
          icon="dashboard"
          label="Enter new name"
          onChange={event => this.setState({ newName: event.target.value })}
        />
      </Modal>
    );
  }
}

BoardRenameModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  rename: PropTypes.func.isRequired,
  boardName: PropTypes.string.isRequired,
}

export default BoardRenameModal;
