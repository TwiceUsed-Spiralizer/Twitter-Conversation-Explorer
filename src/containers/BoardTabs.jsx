import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-materialize';
import { Link } from 'react-router-dom';
import { Board } from './index';

class BoardTabs extends React.Component {
  componentShouldUpdate(nextProps) {
    return nextProps.boardNames !== this.props.boardNames;
    // return false;
  }

  render() {
    return (
      <Tabs className="teal">
        {
          this.props.boardNames.map((name, index) =>
            (<Tab active={index === 0} title={<Link to="/">{name}</Link>}>
              <Board boardName={name} />
            </Tab>)
          )
        }
      </Tabs>
    )
  }
}

const mapStateToProps = state => ({
  boardNames: Object.keys(state.boards),
});

export default connect(mapStateToProps)(BoardTabs);
