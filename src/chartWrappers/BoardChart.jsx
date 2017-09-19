import React from 'react';
import { Col, Row, Icon, Card, Chip, Modal } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';
import './FavouritesChart.css';

export default (unfavourite, BoardPinDropdown) =>
  props => (
    <Col m={12} s={12}>
      <Card horizontal header={<div style={{ height: '300px', margin: '10px' }}>{props.children}</div>} title={<div><Icon left>{props.icon}</Icon> {props.chartObject.keyword}</div>}>
        {props.title}
        <Row id="favourite-button-group">
          <Col m={3}>
            <Chip><div onClick={() => unfavourite(props.chartObject.id)}><Icon small className="favourite-button starred" /></div></Chip>
          </Col>
          <Col m={3}>
            <Chip>
              <BoardPinDropdown trigger={<div><Icon small className="favourite-button">play_for_work</Icon></div>} chartObject={props.chartObject} />
            </Chip>
          </Col>
          <Col m={3}>
            <Chip><Icon small className="favourite-button">share</Icon></Chip>
          </Col>
          <Col m={3}>
            <Chip>
              <Modal trigger={<div><Icon small className="favourite-button">zoom_in</Icon></div>}id="chart-modal" header={props.chartObject.title}>
                <div style={{ height: '500px' }}>{BareChartComponent(props.chartObject)}</div>
              </Modal>
            </Chip>
          </Col>
        </Row>
      </Card>
    </Col>
  );
