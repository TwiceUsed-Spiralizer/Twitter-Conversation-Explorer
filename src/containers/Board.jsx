import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-materialize';
import ChartComponent from '../chartComponents';
import FavouritesChart from '../chartWrappers/FavouritesChart';
import BoardPinModal from '../components/BoardPinModal';

const Board = props => (
  <Row>
    {props.columns.map(column =>
      (<Col m={4}>
        <Card header={column.name}>
          {column.charts.map(ChartComponent(FavouritesChart(null, BoardPinModal)))}
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

export default connect(mapStateToProps)(Board);

