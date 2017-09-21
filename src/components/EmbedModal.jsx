import React from 'react';
import { Modal, Input, Icon, ProgressBar, Button } from 'react-materialize';
import embed from '../firebase/embed';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      embedId: this.props.chartObject.embedId || 'blank',
    }
    this.getEmbedId = this.getEmbedId.bind(this);
  }

  getEmbedId() {
    this.setState({
      embedId: 'loading',
    })
    embed(this.props.chartObject)
      .then(embedId => this.setState({
        embedId,
      }));
  }

  render() {
    const embedButton = this.props.chartObject.embedId
      ? <Button className="modal-action btn-flat">Copy code</Button>
      : <Button className="modal-action btn-flat" onClick={this.getEmbedId}>Generate embed code</Button>;
    let embedContent;
    switch (this.state.embedId) {
      case 'blank':
        embedContent = null;
        break;
      case 'loading':
        embedContent = <ProgressBar className="pink" />;
        break;
      default:
        embedContent = (<Input
          icon="share"
          defaultValue={`<iframe width="560" height="315" src="http://twinsighttest-env.eiwejfj7bv.us-east-2.elasticbeanstalk.com/embed/${this.state.embedId}" frameborder="0" ></iframe>`}
        />)
    }
    return (
      <Modal
        trigger={this.props.trigger}
        actions={[<Button className="modal-action btn-flat" modal="close">Close</Button>, embedButton]}
        header={<div><Icon left>{this.props.chartObject.icon}</Icon> {`Embed ${this.props.chartObject.title}`}</div>}
      >
        {embedContent}
      </Modal>
    )
  }
}
 