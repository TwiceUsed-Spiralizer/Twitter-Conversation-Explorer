import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import './App.css';
import { Col, Row, Container, Button, Card } from 'react-materialize';

const TCECanvas = (props) => {
  if (props.data.hasOwnProperty('menLength')) {
    return (
      <Row>
        <Container>
          <Col m={6}>
            <Card className="blue-grey" textClassName="white" title="Results" actions={[<a href='#'>Export yo' shizzle</a>]}>
              <Doughnut data={{datasets: [{data:[props.data.womenLength, props.data.menLength], backgroundColor:['blue', 'hotpink']}], labels: ['Women', 'Men'] }} />
            </Card>
          </Col>
        </Container>
      </Row>
    );
  }
  return (<Row />);
};

export default TCECanvas;
