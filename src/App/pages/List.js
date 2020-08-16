import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import MovieCard from '../components/MovieCard';

function List(props) {
  const { userMovieList, requesting, baseUrl } = props;

  if (requesting === false) {
    if (userMovieList) {
      return (
        <div>
          <h2>{userMovieList.name}</h2>
          {userMovieList.movies.map((movie) => {
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
          })}
        </div>
      );
    }
    return <Redirect to="/notfound" />;
  }

  return <div>Loading...</div>;
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { firestore } = state;
  const { userMovieLists } = firestore.data;
  const userMovieList = userMovieLists ? userMovieLists[id] : null;
  const requesting = firestore.status.requesting.userMovieLists;

  return {
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
