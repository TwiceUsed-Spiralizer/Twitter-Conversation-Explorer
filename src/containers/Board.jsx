import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input } from 'react-materialize';
import ChartComponent from '../chartComponents';
import BoardChart from '../chartWrappers/BoardChart';
import BoardPinModal from '../components/BoardPinModal';

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
  return {
    boardName,
    columns: state.boards[boardName].columnNames.map((name, index) =>
      ({
        name,
        charts: state.boards[boardName].charts.filter(chart => chart.colIndex === index).map(chart => state.charts[chart.id]),
      }),
    ),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  favourite: id => dispatch({ type: 'FAVOURITES_ADD', id }),
  unfavourite: id => dispatch({ type: 'FAVOURITES_DELETE', id }),
  deleteChart: (id, boardName) => dispatch({ type: 'BOARD_CHART_DELETE', id, boardName }),
  moveColumn: (id, boardName, toColumn) => dispatch({ type: 'BOARD_MOVE_COLUMN', id, boardName, toColumn }),
  nameColumn: (boardName, oldName, newName) => dispatch({ type: 'BOARD_NAME_COLUMN', boardName, oldName, newName }),
  pinToBoard: (id, boardName) =>
    props.boardNames.includes(boardName)
    && !props.boardContents[boardName].includes(id)
    && dispatch({ type: 'BOARD_CHART_ADD', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

