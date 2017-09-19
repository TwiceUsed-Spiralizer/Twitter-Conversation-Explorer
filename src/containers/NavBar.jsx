import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Button, Icon, Modal, Input, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

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
    firebase.database().ref(`/boards/${this.props.user.uid}/`).set({
      [this.state.boardName]: {
        columnNames: ['Yes', 'Maybe', 'Interesting'],
        charts: {},
      },
    });
  }

  render() {
    return (
      <Navbar brand={<Link to="/">Tweet Insight</Link>} right style={{ 'margin-bottom': '20px', 'padding-left': '20px' }}>
        <Row>
          <Modal
            counter={this.props.boards}
            header="Add New Board"
            trigger={<NavItem><Icon>add_box</Icon></NavItem>}
            actions={[<Button waves="light" modal="close" onClick={this.createBoard} flat>Create New Board</Button>]}
          >
            <Input label="Enter a Boardname" s={12} value={this.state.boardName} onChange={event => this.setState({ boardName: event.target.value })} />
          </Modal>
          {this.props.boards.length ?
            <Dropdown trigger={
              <NavItem>My Boards</NavItem>
            }
            >
              {this.props.boards.map(item => <NavItem><Link to={`/board/${item}`}>{item}</Link></NavItem>)}
            </Dropdown> : null}
          <NavItem><Link to="/favourites"><Icon left>star</Icon>Favourites</Link></NavItem>
          <NavItem>Log In</NavItem>
          <NavItem>Sign Up</NavItem>
        </Row>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.boards ? Object.keys(state.boards) : [],
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createBoard: boardName => dispatch({ type: 'BOARD_CREATE', boardName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
