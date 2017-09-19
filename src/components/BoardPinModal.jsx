import React from 'react';
import { Row, Col, Modal, Collection, CollectionItem, Icon, Card } from 'react-materialize';
import { connect } from 'react-redux';
import firebase from '../firebase';
import BareChartComponent from '../chartComponents/BareChartComponent';

const pinToBoard = (uid, boardName, chartObject) => {
  console.log(boardName)
  firebase.database().ref(`/charts/${uid}/`).push(chartObject)
    .then(item => firebase.database().ref(`/boards/${uid}/${boardName}/charts`).push({ id: item.key, colIndex: 0 }));
};

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
              pinToBoard(props.user.uid, event.target.getAttribute('data-name'), props.chartObject);
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
  boards:  props.chartObject.id
    ? Object.keys(state.boards)
      .map(name => ({ ...state.boards[name], name }))
      .filter(board => !board.charts.map(chart => chart.id).includes(props.chartObject.id))
    : Object.keys(state.boards)
      .map(name => ({ ...state.boards[name], name })),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  pinToBoard: (boardName, chartObject) => {
    dispatch({ type: 'CHARTS_ADD', chartObject });
    dispatch({ type: 'BOARD_CHART_ADD', boardName, id: chartObject.id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardPinModal);
