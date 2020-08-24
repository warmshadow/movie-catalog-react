import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import { removeMovieFromList as removeMovieFromListAction } from '../actions';
import MovieCard from '../components/MovieCard';

function List({ auth, userMovieList, requesting, baseUrl, listId, removeMovieFromList }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (userMovieList) {
      // redirect if list doesn't belong to current user
      if (userMovieList.userId !== auth.uid) return <Redirect to="/notfound" />;

      return (
        <div>
          <h2 className="mt-3 mb-5">{userMovieList.name}</h2>
          {userMovieList.movies && userMovieList.movies.length !== 0 ? (
            userMovieList.movies.map((movie) => {
              const { id, posterPath, title, releaseDate } = movie;
              return (
                <>
                  <MovieCard
                    id={id}
                    posterPath={posterPath}
                    title={title}
                    releaseDate={releaseDate}
                    baseUrl={baseUrl}
                    key={id}
                    remove={() => removeMovieFromList(listId, movie)}
                  />
                </>
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
    listId: id,
  };
};

const mapDispatchToProps = {
  removeMovieFromList: removeMovieFromListAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'userMovieLists' }])
)(List);
