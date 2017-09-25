import React from 'react';
import { Modal, Input, Icon, ProgressBar, Button } from 'react-materialize';
import Materialize from 'materialize-css';
import ClipboardButton from 'react-clipboard.js';
import embed from '../firebase/embed';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      embedId: this.props.chartObject.embedId || 'blank',
    }
    this.getEmbedId = this.getEmbedId.bind(this);
    this.toaster = () => Materialize.toast('Text copied to clipboard', 1000);
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
    let embedButton;
    let embedContent;
    let embedText;
    switch (this.state.embedId) {
      case 'blank':
        embedButton = <Button className="modal-action btn-flat" onClick={this.getEmbedId}>Generate embed code</Button>;
        embedContent = null;
        break;
      case 'loading':
        embedButton = null;
        embedContent = <ProgressBar className="pink" />;
        break;
      default:
        embedText = `<iframe width="250" height="250" style="float:left;" src="http://twinsighttest-env.eiwejfj7bv.us-east-2.elasticbeanstalk.com/embed/${this.state.embedId}" frameborder="0" ></iframe>`;
        embedButton = <ClipboardButton onClick={this.toaster} data-clipboard-text={embedText} className="modal-action btn-flat clipboard-button">Copy code</ClipboardButton>;
        embedContent = (<Input
          id={`embed-code-${this.state.embedId}`}
          icon="share"
          defaultValue={embedText}
        />);
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
 