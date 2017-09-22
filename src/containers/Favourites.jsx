import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import firebase from '../firebase';
import ChartComponent from '../chartComponents';
import FavouritesChart from '../chartWrappers/FavouritesChart';
import BoardPinModal from '../components/BoardPinModal';
import embed from '../firebase/embed';

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: true,
    }
    this.setFavouriteStatus = (id, val) => firebase.database().ref(`/charts/${this.props.user.uid}/${id}/favourited`).set(val);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.favourites.length) {
      this.setState({
        animation: false,
      });
    }
  }


  shouldComponentUpdate(nextProps) {
    return nextProps.favourites.length !== this.props.favourites.length;
  }
  
  render() {
    return (
      <Row>
        {this.props.favourites
          .map(ChartComponent(
            FavouritesChart(this.setFavouriteStatus, embed, BoardPinModal),
            this.state.animation),
          )}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  favourites: Object.keys(state.charts || {}).filter(key => state.charts[key].favourited).map(key => ({ ...state.charts[key], id: key })),
  boardNames: Object.keys(state.boards),
  user: state.user,
  boardContents: state.boards,
});

export default connect(mapStateToProps)(Favourites);
