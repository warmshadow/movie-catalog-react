import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { createUserMovieList } from '../actions';

const newList = {
  name: 'as piktas as liudnas',
  userName: 'lowkey',
  movies: [
    {
      id: 475557,
      posterPath: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      title: 'Joker',
      releaseDate: 2019,
    },
  ],
};

function Lists({ userMovieLists, dispatch }) {
  if (userMovieLists) {
    if (userMovieLists.length === 0) return <h3>No lists found</h3>;

    return (
      <div>
        <h2>My lists:</h2>
        <ListGroup>
          {userMovieLists.map((list) => {
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
        <Button onClick={() => dispatch(createUserMovieList(newList))}>Add List</Button>
      </div>
    );
  }
  return <Spinner animation="border" />;
}

const mapStateToProps = (state) => {
  return {
    userMovieLists: state.firestore.ordered.userMovieLists,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'userMovieLists' }])
)(Lists);
