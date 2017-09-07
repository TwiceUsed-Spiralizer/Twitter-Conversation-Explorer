import { Doughnut } from 'react-chartjs';
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
              <Button className="hot pink" style={{width:`${Math.round(props.data.menLength)}px`}}>
                {props.data.hasOwnProperty('menLength') ? '% men tweeting sorry' : ''}
              </Button>
              <div />
              <Button className="blue" style={{width:`${Math.round(props.data.womenLength)}px`}}>
                {props.data.hasOwnProperty('menLength') ? '% women tweeting sorry' : ''}
              </Button>
            </Card>
          </Col>
        </Container>
      </Row>
    );
  }
  return (<Row />);
};

export default TCECanvas;
