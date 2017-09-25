import React from 'react';
import { connect } from 'react-redux';
import { Container, Card, Row, Col, Collection, CollectionItem, Icon, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { BoardDeleteModal, BoardRenameModal } from '../components';
import '../index.css';

class BoardTabs extends React.Component {
  componentShouldUpdate(nextProps) {
    return nextProps.boardNames !== this.props.boardNames;
  }

  render() {
    return (
      <Row>
        <Container>
          {
            this.props.boards.map(board => (
              <Col s={4}>
                <Link to={`/boards/${board.boardName}`}>
                  <Card
                    className="hoverable tangerine-background"
                    title={<div className="cerulean-text"><Icon left>dashboard</Icon> {board.boardName}</div>}
                    actions={[
                      <BoardDeleteModal
                        trigger={<Button flat className="tangerine">Delete</Button>}
                        delete={() => this.props.deleteBoard(board.boardName)}
                        boardName={board.boardName}
                      />,
                      <BoardRenameModal
                        trigger={<Button flat className="light" style={{ marginLeft: '20px' }}>Rename</Button>}
                        boardName={board.boardName}
                        rename={newName => this.props.renameBoard(board.boardName, newName)}
                      />,
                    ]}
                  >
                    <Collection>
                      {board.charts.map(chart => <CollectionItem><Icon left>{chart.icon}</Icon>{chart.title}</CollectionItem>)}
                    </Collection>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Container>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  const uid = (firebase.auth().currentUser || { uid: null }).uid;
  return {
    boards: Object.keys(state.boards)
      .map(boardName => ({ 
        charts: Object.values(state.boards[boardName].charts || {})
          .map(({ id }) => state.charts[id]).slice(0, 4),
        boardName,
      }),
      ).sort((a, b) => b.charts.length - a.charts.length),
    deleteBoard: boardName => firebase.database().ref(`/boards/${uid}/${boardName}`).remove(),
    renameBoard: (boardName, newName) => firebase.database().ref(`/boards/${uid}/${boardName}`).once('value', (board) => {
      firebase.database().ref(`/boards/${uid}/${newName}`).set(board.val());
      firebase.database().ref(`/boards/${uid}/${boardName}`).remove();
    }),
  }
};

export default connect(mapStateToProps)(BoardTabs);
