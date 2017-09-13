import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import './App.css';
import { Col, Row, Container, Button, Card } from 'react-materialize';

const TCECanvas = (props) => {
<<<<<<< 6f2c97471952b9165e3cabd8d7fc6b67afd234c9
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
=======
  console.log(props);
  return (
    <Row>
      <Container>
        <Col m={6}>

        </Col>
      </Container>
    </Row>
  );
>>>>>>> Add example use of TwitterDoughnut in QueryResults
};

export default TCECanvas;
