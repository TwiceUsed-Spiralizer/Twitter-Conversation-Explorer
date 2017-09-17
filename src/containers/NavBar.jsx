import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Button, Icon, Modal, Input, Row, Toast } from 'react-materialize';
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
    this.setState({
      boardName: '',
    });
    return (<Toast toast="here you go!">
    Toast
    </Toast>);
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
          {this.props.boards.length ?
            <Dropdown trigger={
              <NavItem>My Boards</NavItem>
            }
            >
              {this.props.boards.map(item => <NavItem><Link to={`/board/${item}`}>{item}</Link></NavItem>)}
            </Dropdown> : null}
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
