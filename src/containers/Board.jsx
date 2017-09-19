import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-materialize';
import ChartComponent from '../chartComponents';
import BoardChart from '../chartWrappers/BoardChart';
import BoardPinModal from '../components/BoardPinModal';

const Board = props => (
  <Row>
    {props.columns.map(column =>
      (<Col m={4}>
        <Card horizontal title={<div style={{ textAlign: "center" }}>{column.name}</div>}>
          <Row>
          {column.charts.map(ChartComponent(BoardChart(props.unfavourite, BoardPinModal)))}
          </Row>
        </Card>
      </Col>),
    )}
  </Row>
);

const mapStateToProps = (state, props) => {
  const boardName = props.match.params.boardName;
  return {
    columns: state.boards[boardName].columnNames.map((name, index) =>
      ({
        name,
        charts: state.boards[boardName].charts.filter(chart => chart.colIndex === index).map(chart => state.charts[chart.id]),
      }),
    ),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  unfavourite: id => dispatch({ type: 'FAVOURITES_DELETE', id }),
  pinToBoard: (id, boardName) =>
    props.boardNames.includes(boardName)
    && !props.boardContents[boardName].includes(id)
    && dispatch({ type: 'BOARD_ADD_CHART', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

