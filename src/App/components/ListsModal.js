import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { addMovieToList as addMovieToListAction } from '../actions';

function ListsModal({ show, handleClose, userMovieLists, auth, movie, addMovieToList }) {
  if (userMovieLists) {
    const currUserMovieLists = userMovieLists.filter((list) => list.userId === auth.uid);

    if (currUserMovieLists.length === 0) return <h3>No lists found</h3>;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {currUserMovieLists.length !== 0 ? (
              currUserMovieLists.map((list) => (
                <ListGroup.Item
                  action
                  onClick={() => {
                    addMovieToList(list, movie);
                    handleClose();
                  }}
                >
                  {list.name}
                </ListGroup.Item>
              ))
            ) : (
              <p>No lists found</p>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
}

const mapStateToProps = (state) => {
  const { userMovieLists } = state.firestore.ordered;
  return {
    userMovieLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  addMovieToList: addMovieToListAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'userMovieLists' }])
)(ListsModal);
