import React from 'react';
import { connect } from 'react-redux';
import { Container, Card, Row, Col, Collection, CollectionItem, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { Board } from './index';
import BareChartComponent from '../chartComponents/BareChartComponent';

class BoardTabs extends React.Component {
  componentShouldUpdate(nextProps) {
    return nextProps.boardNames !== this.props.boardNames;
    // return false;
  }

  render() {
    return (
      <Row>
        <Container>
          {
            this.props.boards.map(board => (
              <Col s={4}>
                <Link to={`/boards/${board.boardName}`}>
                  <Card className="hoverable" title={<div><Icon left>dashboard</Icon> {board.boardName}</div>}>
                    <Collection>
                      {board.charts.map(chart => <CollectionItem><Icon left>{chart.icon}</Icon>{chart.title}</CollectionItem>)}
                    </Collection>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Container>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  boards: Object.keys(state.boards)
    .map(boardName => ({ 
      charts: Object.values(state.boards[boardName].charts || {})
        .map(({ id }) => state.charts[id]).slice(0, 4),
      boardName,
    }),
    ).sort((a, b) => b.charts.length - a.charts.length),
});

export default connect(mapStateToProps)(BoardTabs);
