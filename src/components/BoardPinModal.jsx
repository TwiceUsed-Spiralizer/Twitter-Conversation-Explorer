import React from 'react';
import { Row, Col, Modal, Collection, CollectionItem, Icon, Card } from 'react-materialize';
import { connect } from 'react-redux';
import BareChartComponent from '../chartComponents/BareChartComponent';

const BoardPinModal = props => (
  <Modal
    bottomSheet
    trigger={props.trigger}
    actions={false}
  >
    <Row>
      <Col m={4}>
        <Card title={<div><Icon left>{props.chartObject.icon}</Icon> {`Pinning ${props.chartObject.title}`}</div>}>
          <div style={{ height: '250px' }}>{BareChartComponent(props.chartObject)}</div>
        </Card>
      </Col>
      <Col m={8}>
        <Collection header="Your Boards">
          <div
            role="button"
            tabIndex="0"
            onClick={(event) => {
              event.preventDefault();
              props.pinToBoard(event.target.getAttribute('data-name'), props.chartObject.id);
            }}
          >
            {props.boards.map(board => <CollectionItem href="#" data-name={board.name} key={board.name}><Icon left>save</Icon>{board.name}</CollectionItem>)}
          </div>
        </Collection>
      </Col>
    </Row>
  </Modal>
);

const mapStateToProps = (state, props) => ({
  boards: Object.keys(state.boards)
    .map(name => ({ ...state.boards[name], name }))
    .filter(board => !board.charts.map(chart => chart.id).includes(props.chartObject.id)),
});

const mapDispatchToProps = dispatch => ({
  pinToBoard: (boardName, id) => dispatch({ type: 'BOARD_CHART_ADD', boardName, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardPinModal);
