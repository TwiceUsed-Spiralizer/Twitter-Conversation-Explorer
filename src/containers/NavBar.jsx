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
  }

  render() {
    return (
      <Navbar brand={<Link to="/">Tweet Insight</Link>} right>
        <Button waves="light">Log In</Button>
        <Button waves="light" >Sign Up</Button>
        <Modal
          header="Add New Board"
          trigger={<Button icon="add_box" />}
        >
          <Input label="Enter a Boardname" s={12} onChange={event => this.setState({ boardName: event.target.value })} />
        </Modal>
        <Row>
          <Input s={3} type="select" label="BoardName" defaultValue={1} onChange={event => this.setState({ boardName: event.target.value })} />
        </Row>
        {/* <Button waves="light"><Link to="/board">Add New Board</Link></Button> */}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  favourites: Array.from(state.favourites).map(key => state.charts[key]),
});

const mapDispatchToProps = dispatch => ({
  createBoard: boardName => dispatch({ type: 'BOARD_CREATE', boardName }),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
