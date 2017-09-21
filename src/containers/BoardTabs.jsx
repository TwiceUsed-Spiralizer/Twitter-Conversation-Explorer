import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-materialize';

class BoardTabs extends React.Component {
  componentShouldUpdate(nextProps) {
    return nextProps.boardNames !== this.props.boardNames;
  }

  render() {
    return (
      <Tabs>
        {
          this.props.boardNames.map((name, index) =>
            (<Tab active={index === 0} title={name}>
              {name}
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
