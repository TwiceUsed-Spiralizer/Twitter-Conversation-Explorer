import React from 'react';
import { Col, Row, Icon, Card, Chip, Modal } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';
import { EmbedModal } from '../components';
import './FavouritesChart.css';
import '../index.css';

export default (favourite, embed, BoardPinDropdown) =>
  props => (
    <Col xl={4} l={4} m={12} s={12}>
      <Card className="light-background" textClassName="cerulean-text" horizontal header={<div style={{ height: '300px', margin: '10px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        <Row>
          {props.title}
        </Row>
        <Row id="favourite-button-group">
          <Col m={3}>
            <Chip><button onClick={() => favourite(props.chartObject.id, !props.chartObject.favourited)}><Icon small className="favourite-button starred" /></button></Chip>
          </Col>
          <Col m={3}>
            <Chip>
              <BoardPinDropdown trigger={<div><Icon small className="favourite-button">pin_drop</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>
          <Col m={3}>
            <Chip>
              <EmbedModal trigger={<div><Icon small className="favourite-button tangerine-text">share</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>
          <Col m={3}>
            <Chip>
              <Modal trigger={<div><Icon small className="favourite-button light-text">zoom_in</Icon></div>} header={props.chartObject.title}>
                <div style={{ height: '500px' }}>{BareChartComponent(props.chartObject)}</div>
              </Modal>
            </Chip>
          </Col>
        </Row>
      </Card>
    </Col>
  );
