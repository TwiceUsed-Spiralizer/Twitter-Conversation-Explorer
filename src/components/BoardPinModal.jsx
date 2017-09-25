import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Collection, CollectionItem, Icon, Card } from 'react-materialize';
import { connect } from 'react-redux';
import Materialize from 'materialize-css';
import { chartObject } from '../utils/propTypes';
import firebase from '../firebase';
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
              props.results
                ? props.pinResultToBoard(props.user.uid, event.target.getAttribute('data-name'), props.chartObject)
                : props.pinToBoard(props.user.uid, event.target.getAttribute('data-name'), props.chartObject);
            }}
          >
            {props.boards.map(board => <CollectionItem href="#" data-name={board.name} key={board.name}><Icon left>save</Icon>{board.name}</CollectionItem>)}
          </div>
        </Collection>
      </Col>
    </Row>
  </Modal>
);

BoardPinModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  chartObject: PropTypes.shape(chartObject).isRequired,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
  boards: props.chartObject.id
    ? Object.keys(state.boards)
      .map(name => ({ ...state.boards[name], name }))
      .filter(board => !Object.keys(board.charts || {}).map(key => board.charts[key].id).includes(props.chartObject.id))
    : Object.keys(state.boards)
      .map(name => ({ ...state.boards[name], name })),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  pinToBoard: (uid, boardName, chartObject) => {
    firebase.database().ref(`/boards/${uid}/${boardName}/charts`).push({ id: chartObject.id, colIndex: 0 })
      .then(() => Materialize.toast(`Pinned to ${boardName}`, 1500));
  },
  pinResultToBoard: (uid, boardName, chartObject) => {
    if (chartObject.id) {
      firebase.database().ref(`/boards/${uid}/${boardName}/charts`).push({ id: chartObject.id, colIndex: 0 })
        .then(() => Materialize.toast(`Pinned to ${boardName}`, 1500));
    } else {
      const { resultsIndex, ...restOfObject } = chartObject;
      firebase.database().ref(`/charts/${uid}`).push(restOfObject)
        .then((item) => {
          firebase.database().ref(`/boards/${uid}/${boardName}/charts`).push({ id: item.key, colIndex: 0 });
          dispatch({
            type: 'RESULTS_CHANGE',
            index: chartObject.resultsIndex,
            chartObject: {
              ...chartObject,
              id: item.key,
            },
          });
          Materialize.toast(`Pinned to ${boardName}`, 1500);
        });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardPinModal);
