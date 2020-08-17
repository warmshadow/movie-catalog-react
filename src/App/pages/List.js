import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from '../components/MovieCard';

function List({ auth, userMovieList, requesting, baseUrl }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (userMovieList) {
      // redirect if list doesn't belong to current user
      if (userMovieList.userId !== auth.uid) return <Redirect to="/notfound" />;

      return (
        <div>
          <h2>{userMovieList.name}</h2>
          {userMovieList.movies ? (
            userMovieList.movies.map((movie) => {
              const { id, posterPath, title, releaseDate } = movie;
              return (
                <MovieCard
                  id={id}
                  posterPath={posterPath}
                  title={title}
                  releaseDate={releaseDate}
                  baseUrl={baseUrl}
                  key={id}
                />
              );
            })
          ) : (
            <h5>No movies in the list</h5>
          )}
        </div>
      );
    }
    return <Redirect to="/notfound" />;
  }

  return <Spinner animation="border" />;
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { firestore } = state;
  const { userMovieLists } = firestore.data;
  const userMovieList = userMovieLists ? userMovieLists[id] : null;
  const requesting = firestore.status.requesting.userMovieLists;

  return {
    auth: state.firebase.auth,
    userMovieList,
    requesting,
    baseUrl: state.config.images.secure_base_url,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'userMovieLists' }])
)(List);
