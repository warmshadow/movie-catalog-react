import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { createUserMovieList as createUserMovieListAction } from '../actions';
import CreateList from '../components/CreateList';

function Lists({ auth, userMovieLists, createUserMovieList }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  if (userMovieLists) {
    const currUserMovieLists = userMovieLists.filter((list) => list.userId === auth.uid);
    if (currUserMovieLists.length === 0) return <h3>No lists found</h3>;

    return (
      <div>
        <h2>My lists:</h2>
        <ListGroup className="mb-5">
          {currUserMovieLists.map((list) => {
            const { id, name, createdAt } = list;
            const date = moment(createdAt.toDate()).format('MMM D, YYYY');
            return (
              <ListGroup.Item>
                <Link to={`/lists/${id}`}>
                  <h4>{name}</h4>
                  <h5>{date}</h5>
                </Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <CreateList createList={createUserMovieList} />
      </div>
    );
  }
  return <Spinner animation="border" />;
}

const mapStateToProps = (state) => {
  const { userMovieLists } = state.firestore.ordered;
  return {
    userMovieLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  createUserMovieList: createUserMovieListAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'userMovieLists' }])
)(Lists);
