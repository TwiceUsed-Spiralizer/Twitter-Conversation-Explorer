import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Button, Icon, Modal, Input, Row } from 'react-materialize';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: '',
    };
    this.createBoard = this.createBoard.bind(this);
  }

  createBoard() {
    this.props.createBoard(this.state.boardName);
  }

  render() {
    return (
      <Navbar brand={<Link to="/">Tweet Insight</Link>} right>
        <Row>
          <Modal
            header="Add New Board"
            trigger={<NavItem><Icon>add_box</Icon></NavItem>}
          >
            <Input label="Enter a Boardname" s={12} onChange={event => this.setState({ boardName: event.target.value })} />
            <Button onClick={this.createBoard}>Create New Board</Button>
          </Modal>
          <Input s={3} type="select" label="BoardName">
          {this.props.boards.map(item => <option>{item}</option>)}
          </Input>
          <NavItem>Log In</NavItem>
          <NavItem>Sign Up</NavItem>
        </Row>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  boards: Object.keys(state.boards),
});

const mapDispatchToProps = dispatch => ({
  createBoard: boardName => dispatch({ type: 'BOARD_CREATE', boardName }),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
