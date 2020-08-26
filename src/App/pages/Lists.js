import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import {
  createMediaList as createMediaListAction,
  deleteMediaList as deleteMediaListAction,
} from '../actions';
import CreateList from '../components/CreateList';

const Options = ({ deleteMediaList }) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 100,
        padding: '1.25rem',
      }}
    >
      <Button variant="outline-danger" className="btn-sm" onClick={deleteMediaList}>
        Delete List
      </Button>
    </div>
  );
};

function Lists({ auth, mediaLists, createMediaList, deleteMediaList }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  if (mediaLists) {
    const userMediaLists = mediaLists.filter((list) => list.userId === auth.uid);
    if (userMediaLists.length === 0) return <h3>No lists found</h3>;

    return (
      <div>
        <h2 className="font-italic mb-4">My lists:</h2>
        <ListGroup className="mb-4">
          {userMediaLists.map((list) => {
            const { id, name, createdAt } = list;
            const date = moment(createdAt.toDate()).format('MMM D, YYYY');
            return (
              <ListGroup.Item
                className="listItem d-flex align-items-center justify-content-center"
                key={id}
              >
                <Link className="text-decoration-none stretched-link" to={`/lists/${id}`} />
                <div>
                  <h5>{name}</h5>
                  <h6>{date}</h6>
                </div>
                <Options deleteMediaList={() => deleteMediaList(list)} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <CreateList createList={createMediaList} />
      </div>
    );
  }
  return <Spinner animation="border" />;
}

const mapStateToProps = (state) => {
  const { mediaLists } = state.firestore.ordered;
  return {
    mediaLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  createMediaList: createMediaListAction,
  deleteMediaList: deleteMediaListAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'mediaLists' }])
)(Lists);
