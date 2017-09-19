import React from 'react';
import { Col, Row, Icon, Card, Chip, Modal } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';
import './BoardChart.css';

export default (boardName, favourite, unfavourite, deleteChart, moveColumn, BoardPinDropdown) =>
  props => (
    <Col m={12} s={12}>
      <Card horizontal header={<div style={{ height: '300px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        {props.title}
        <Row id="favourite-button-group">
          <Col s={4}>
            <Chip><div onClick={() => favourite(props.chartObject.id)}><Icon small className="favourite-button starred" /></div></Chip>
          </Col>

          <Col s={4}>
            <Chip>
              <BoardPinDropdown trigger={<div><Icon small className="favourite-button">play_for_work</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>

          <Col s={4}>
            <Chip><Icon small className="favourite-button">share</Icon></Chip>
          </Col>

          <Col s={4}>
            <Chip>
              <Modal trigger={<div><Icon small className="favourite-button">zoom_in</Icon></div>}id="chart-modal" header={props.chartObject.title}>
                <div style={{ height: '500px' }}>{BareChartComponent(props.chartObject)}</div>
              </Modal>
            </Chip>
          </Col>

          <Col s={4}>
            <Chip><div onClick={() => deleteChart(props.chartObject.id, boardName)}><Icon small className="favourite-button">delete</Icon></div></Chip>
          </Col>

          <Col s={4}>
            {/* {props.index} */}
            <Chip><div onClick={() => moveColumn(props.chartObject.id, boardName, (props.index + 1))}><Icon small className="favourite-button">compare_arrows</Icon></div></Chip>
          </Col>

        </Row>
      </Card>
    </Col>
  );
