import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { addMovieToList as addMovieToListAction } from '../actions';

function ListsModal({ show, handleClose, mediaLists, auth, item, addMovieToList }) {
  if (mediaLists && auth.uid) {
    const userMediaLists = mediaLists.filter((list) => list.userId === auth.uid);

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {userMediaLists.length !== 0 ? (
              userMediaLists.map((list) => (
                <ListGroup.Item
                  action
                  onClick={() => {
                    addMovieToList(list.id, item);
                    handleClose();
                  }}
                  key={list.id}
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
  const { mediaLists } = state.firestore.ordered;
  return {
    mediaLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  addMovieToList: addMovieToListAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'mediaLists' }])
)(ListsModal);
