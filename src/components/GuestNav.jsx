import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Button, Icon, Modal, Input, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class GuestNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: '',
    };
  }

  componentDidMount() {
    console.log('mount')
    console.log(document.getElementById('auth-modal'));
  }

  render() {
    return (
      <Navbar brand={<Link to="/">Tweet Insight</Link>} right style={{ 'margin-bottom': '20px', 'padding-left': '20px' }}>
        <Row>
          <NavItem><Link to="/login"><Icon right>account_circle</Icon>Login</Link></NavItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(GuestNav);
