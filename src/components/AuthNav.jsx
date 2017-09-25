import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavItem, Button, Icon, Modal, Input, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import './AuthNav.css';

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
    firebase.database().ref(`/boards/${this.props.user.uid}/${this.state.boardName}`).set({
      columnNames: ['Yes', 'Maybe', 'Interesting'],
      charts: {},
    });
  }

  render() {
    return (
      <Navbar brand={<Link id="title" to="/">Tweet Insight</Link>} right id="auth-nav">
        <Row>
          <Modal
            counter={this.props.boards}
            header="Add New Board"
            trigger={<NavItem id="create-board"><Icon >add_box</Icon></NavItem>}
            actions={[<Button href="" waves="light" modal="close" onClick={this.createBoard} flat>Create New Board</Button>]}
          >
            <Input label="Enter a Boardname" s={12} value={this.state.boardName} onChange={event => this.setState({ boardName: event.target.value })} />
          </Modal>
          <NavItem><Link to="/boards"><Icon className="light-text" left>dashboard</Icon>My Boards</Link></NavItem>
          <NavItem><Link to="/favourites"><Icon className="light-text" left>star</Icon>Favourites</Link></NavItem>
          <NavItem onClick={() => firebase.auth().signOut()} ><Link to="/"><Icon className="light-text" right>close</Icon>Logout</Link></NavItem>
        </Row>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  createBoard: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
  boards: state.boards ? Object.keys(state.boards) : [],
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createBoard: boardName => dispatch({ type: 'BOARD_CREATE', boardName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
