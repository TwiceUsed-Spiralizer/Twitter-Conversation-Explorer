import React from 'react';
import axios from 'axios';
import { Preloader } from 'react-materialize';
import BareChartComponent from '../chartComponents/BareChartComponent';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    }
  }

  componentDidMount() {
    axios.get(`https://us-central1-tweet-insight.cloudfunctions.net/embed/${this.props.match.params.embedId}`).then((res) => {
      if (res.status === 200) {
        this.setState({
          data: res.data,
        });
      } else {
        this.setState({
          data: true,
        });
      }
    });
  }

  render() {
    switch (this.state.data) {
      case false:
        return (<Preloader big flashing />);
      case true:
        return (<div>Bad embed</div>);
      default:
        return BareChartComponent(this.state.data);
    }
  }
};
