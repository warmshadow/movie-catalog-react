import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { createMediaList as createMediaListAction } from '../actions';
import CreateList from '../components/CreateList';

function Lists({ auth, mediaLists, createMediaList }) {
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
              <ListGroup.Item key={id}>
                <Link className="text-decoration-none" to={`/lists/${id}`}>
                  <h5>{name}</h5>
                  <h6>{date}</h6>
                </Link>
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
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'mediaLists' }])
)(Lists);
