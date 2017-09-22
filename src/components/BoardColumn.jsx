import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Icon, Modal } from 'react-materialize';
import debounce from 'lodash/debounce';
import ChartComponent from '../chartComponents';
import BoardChart from '../chartWrappers/BoardChart';
import BoardPinModal from '../components/BoardPinModal';
import firebase from '../firebase';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: [
        false,
        false,
        false,
      ],
    };
  }

  render() {
    return (
      <Row>
        <Row>
          <h1 style={{ textAlign: 'center' }}>{this.props.boardName}</h1>
        </Row>
        {this.props.columns.map((column, index) =>
          (<Col m={4}>
            <Card
              horizontal
              title={<div>{column.name} <div><Icon right>edit</Icon></div></div>}
            >
              <Row>
                {this.state.edit[index] && <Input label="Enter a Column Name" s={12} onChange={event => this.props.nameColumn(this.props.boardName, index, event.target.value)} />}
                {column.charts.map(ChartComponent(BoardChart(this.props.boardName, this.props.favourite, this.props.unfavourite, this.props.deleteChart, this.props.moveColumn, BoardPinModal)))}
              </Row>
            </Card>
          </Col>),
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state, props) => {
  const boardName = props.match.params.boardName;
  const boardState = state.boards[boardName];
  return {
    boardName,
    columns: boardState.columnNames.map((name, index) =>
      ({
        name,
        charts: Object.keys(boardState.charts || {})
          .map(key => ({ ...boardState.charts[key], parentKey: key }))
          .filter(chart => chart.colIndex === index)
          .map(chart => ({ ...state.charts[chart.id], parentKey: chart.parentKey, colIndex: chart.colIndex })),
      }),
    ),
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const uid = firebase.auth().currentUser.uid;
  return {
    favourite: id => dispatch({ type: 'FAVOURITES_ADD', id }),
    unfavourite: id => dispatch({ type: 'FAVOURITES_DELETE', id }),
    deleteChart: (parentKey, boardName) => firebase.database().ref(`/boards/${uid}/${boardName}/charts/${parentKey}`).remove(),
    moveColumn: (parentKey, boardName, toColumn) => firebase.database().ref(`/boards/${uid}/${boardName}/charts/${parentKey}/colIndex`).set(toColumn),
    nameColumn: debounce(
      (boardName, index, newName) => firebase.database().ref(`/boards/${uid}/${boardName}/columnNames/${index}`).set(newName),
      400),
    pinToBoard: (id, boardName) =>
      props.boardNames.includes(boardName)
      && !props.boardContents[boardName].includes(id)
      && dispatch({ type: 'BOARD_CHART_ADD', id }),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

