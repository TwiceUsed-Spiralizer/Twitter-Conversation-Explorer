import React from 'react';
import { CollapsibleItem, Button, Icon, Modal, Row, Col } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';

export default (clickHandler, fromBoard) => {
  return props => (
    <CollapsibleItem icon={props.icon}>
      <Row>
        <div style={{height:'350px'}}>{props.children}</div>
      </Row>
      <Row>
        <Col m={4}>
          <Modal trigger={<Button>Modal</Button>} header="Sexy Chart">
            <div style={{ height: '500px' }}>{BareChartComponent(props.chartObject)}</div>
          </Modal>
        </Col>
        <Col m={6} className="offset-m2">
          <Button onClick={() => clickHandler(props.index, fromBoard, 'maybe')}><Icon left>compare_arrows</Icon>Maybe</Button>
        </Col>
      </Row>
    </CollapsibleItem>
  );
};
