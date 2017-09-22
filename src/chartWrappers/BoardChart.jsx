import React from 'react';
import { Col, Row, Icon, Card, Chip, Modal } from 'react-materialize';
import { EmbedModal } from '../components';
import BareChartComponent from '../chartComponents/BareChartComponent';
import './BoardChart.css';

export default (boardName, favourite, embed, deleteChart, moveColumn, BoardPinDropdown) =>
  props => (
    <Col m={12} s={12}>
      <Card horizontal header={<div style={{ height: '300px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        <Col>
          {props.title}
        </Col>
        <Row id="favourite-button-group">
          <Col s={4}>
            <Chip><button onClick={() => favourite(props.chartObject.id, !props.chartObject.favourited)}>
              <Icon small className={`favourite-button ${props.chartObject.favourited ? 'starred' : 'unstarred'}`} />
            </button></Chip>
          </Col>

          <Col s={4}>
            <Chip>
              <BoardPinDropdown trigger={<div><Icon small className="favourite-button">pin_drop</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>

          <Col s={4}>
            <Chip>
              <EmbedModal trigger={<div><Icon small className="favourite-button">share</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>

          <Col s={4}>
            <Chip>
              <Modal trigger={<div><Icon small className="favourite-button">zoom_in</Icon></div>} header={props.chartObject.title}>
                <div style={{ height: '500px' }}>{BareChartComponent(props.chartObject)}</div>
              </Modal>
            </Chip>
          </Col>

          <Col s={4}>
            <Chip><button onClick={() => deleteChart(props.chartObject.parentKey, boardName)}><Icon small className="favourite-button">delete</Icon></button></Chip>
          </Col>

          <Col s={4}>
            <Chip><button onClick={() => moveColumn(props.chartObject.parentKey, boardName, (props.chartObject.colIndex + 1) % 3)}><Icon small className="favourite-button">compare_arrows</Icon></button></Chip>
          </Col>

        </Row>
      </Card>
    </Col>
  );
