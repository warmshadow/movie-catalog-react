import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PageLinks from './PageLinks';
import MovieCard from './MovieCard';
import { setRating as setRatingAction } from '../actions';

function MovieList({ movies, baseUrl, basePath, addToList, userRatings, setRating }) {
  if (movies.isPending) return <Spinner animation="border" />;

  return movies.results.length ? (
    <>
      {movies.results.map((movie) => {
        const {
          id,
          poster_path: posterPath,
          title,
          release_date: releaseDate,
          vote_average: voteAverage,
        } = movie;

        const rating = userRatings && userRatings.items[id];

        return (
          <MovieCard
            id={id}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            rating={rating && rating}
            baseUrl={baseUrl}
            key={id}
            add={() => addToList(movie)}
            setRating={setRating}
          />
        );
      })}
      <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
    </>
  ) : (
    <h2>No Items found</h2>
  );
}

const mapStateToProps = (state) => {
  const { auth } = state.firebase;
  const { firestore } = state;
  const { usersRatings } = firestore.data;
  const userRatings = usersRatings ? usersRatings[auth.uid] : null;

  return {
    userRatings,
  };
};

const mapDispatchToProps = {
  setRating: setRatingAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'usersRatings' }])
)(MovieList);
