import React from 'react';
import { Row, Col, Modal, Collection, CollectionItem, Icon, Card } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';

export default (trigger, id, chartObject) => (
  <Modal
    bottomSheet
    trigger={trigger}>
    <Row>
      <Col m={4}>
        <Card title={<div><Icon left>{chartObject.icon}</Icon> {`Pinning ${chartObject.title}`}</div>}>
          <div style={{ height: '250px' }}>{BareChartComponent(chartObject)}</div>
        </Card>
      </Col>
      <Col m={8}>
        <Collection header="Your Boards">
          <CollectionItem>Bums<Icon left>save</Icon></CollectionItem>
        </Collection>
      </Col>
    </Row>
  </Modal>
);
