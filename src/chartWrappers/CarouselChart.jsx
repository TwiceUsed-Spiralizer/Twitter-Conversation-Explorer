import React from 'react';
import { Button, Icon, Card, Row, Col, Input } from 'react-materialize';
import { BoardPinModal } from '../components';

export default (favourite, embed, authenticated) =>
  props => (
    <Card {...props} title={<Icon left>{props.icon}</Icon>}>
      <h5 style={{ textAlign: 'center' }}>{props.title}</h5>
      <div style={{ height: '750px', width: '75%', margin: 'auto' }}>{props.children}</div>
      {authenticated &&
        (<Row>
          <Col>
            {
              props.chartObject.favourited
                ? <Button><Icon left style={{ color: 'gold' }}>star</Icon>Favourited</Button>
                : <Button onClick={() => favourite(props.chartObject)}><Icon left>star_border</Icon> Favourite</Button>
            }
          </Col>
          <Col>
            <Button waves="purple" onClick={() => embed(props.chartObject)}><Icon left>share</Icon> Share</Button>
          </Col>
          <Col>
            <BoardPinModal
              results
              trigger={<Button waves="purple"><Icon left>play_for_work</Icon> Pin</Button>}
              chartObject={props.chartObject}
            />
          </Col>
          {props.chartObject.embedId && <Col>
            <Input
              label="Embed code"
              defaultValue={`<iframe width="560" height="315" src="http://twinsighttest-env.eiwejfj7bv.us-east-2.elasticbeanstalk.com/embed/${props.chartObject.embedId}" frameborder="0" ></iframe>`}
            >
              <Icon>share</Icon>
            </Input>
          </Col>}
        </Row>)
      }
    </Card>
  );
