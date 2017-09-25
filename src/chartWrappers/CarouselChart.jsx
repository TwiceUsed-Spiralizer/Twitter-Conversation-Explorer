import React from 'react';
import { Button, Icon, Card } from 'react-materialize';
import { BoardPinModal, EmbedModal } from '../components';
import '../index.css';

export default (favourite, embed, authenticated) =>
  props => (
    <Card
      textClassName="light-background cerulean-text"
      {...props}
      title={<Icon left>{props.icon}</Icon>}
      actions={[
        <EmbedModal trigger={<Button flat waves="orange"><Icon left>share</Icon> Share</Button>} chartObject={props.chartObject} />,
        authenticated && (props.chartObject.favourited
          ? <Button flat waves="orange"><Icon left style={{ color: 'gold' }}>star</Icon>Favourited</Button>
          : <Button flat waves="orange" onClick={() => favourite(props.chartObject)}><Icon left>star_border</Icon> Favourite</Button>),
        authenticated && <BoardPinModal
          results
          trigger={<Button flat><Icon waves="orange" left>pin_drop</Icon> Pin</Button>}
          chartObject={props.chartObject}
        />
      ]}
    >
      <h5 style={{ textAlign: 'center' }}>{props.title}</h5>
      <div style={{ height: '650px', width: '75%', margin: 'auto' }}>{props.children}</div>
    </Card>
  );
