import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input } from 'react-materialize';
import ChartComponent from '../chartComponents';
import BoardChart from '../chartWrappers/BoardChart';
import BoardPinModal from '../components/BoardPinModal';
import firebase from '../firebase';

const Board = props => (
  <Row>
    <Row>
      <h1 style={{ textAlign: 'center' }}>{props.boardName}</h1>
    </Row>
    {props.columns.map(column =>
      (<Col m={4}>
        <Card
          horizontal
          title={<Input label="Enter a ColumnName" s={12} defaultValue={column.name} onChange={event => props.nameColumn(props.boardName, column.name, event.target.value)} />
          }
        >
          <Row>
            {column.charts.map(ChartComponent(BoardChart(props.boardName, props.favourite, props.unfavourite, props.deleteChart, props.moveColumn, BoardPinModal)))}
          </Row>
        </Card>
      </Col>),
    )}
  </Row>
);

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

const mapDispatchToProps = (dispatch, props) => ({
  favourite: id => dispatch({ type: 'FAVOURITES_ADD', id }),
  unfavourite: id => dispatch({ type: 'FAVOURITES_DELETE', id }),
  deleteChart: (parentKey, boardName) => firebase.database().ref(`/boards/${firebase.auth().currentUser.uid}/${boardName}/charts/${parentKey}`).remove(),
  moveColumn: (parentKey, boardName, toColumn) => firebase.database().ref(`/boards/${firebase.auth().currentUser.uid}/${boardName}/charts/${parentKey}/colIndex`).set(toColumn),
  nameColumn: (boardName, oldName, newName) => dispatch({ type: 'BOARD_NAME_COLUMN', boardName, oldName, newName }),
  pinToBoard: (id, boardName) =>
    props.boardNames.includes(boardName)
    && !props.boardContents[boardName].includes(id)
    && dispatch({ type: 'BOARD_CHART_ADD', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

