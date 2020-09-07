import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PageLinks from './PageLinks';
import MovieCard from './MovieCard';
import { setRating as setRatingAction, removeRating as removeRatingAction } from '../actions';

// eslint-disable-next-line camelcase
const keysToCamel = ({ poster_path, release_date, vote_average, ...object }) => ({
  posterPath: poster_path,
  releaseDate: release_date,
  voteAverage: vote_average,
  ...object,
});

function MovieList({
  movies,
  baseUrl,
  basePath,
  addToList,
  removeFromList,
  userRatings,
  setRating,
  removeRating,
  addToWatchlist,
}) {
  const listItems = movies.results || movies.items;

  return listItems.length ? (
    <>
      {listItems.map((movie) => {
        let item = keysToCamel(movie);
        const { id, posterPath, title, releaseDate, voteAverage } = item;
        item = { id, posterPath, title, releaseDate, voteAverage };

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
            add={addToList ? () => addToList(movie) : null}
            remove={removeFromList ? () => removeFromList(item) : null}
            addToWatchlist={addToWatchlist ? () => addToWatchlist(movie) : null}
            setRating={
              (newRating) =>
                setRating(newRating, { id, posterPath, title, releaseDate, voteAverage })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            removeRating={() => removeRating({ id, posterPath, title, releaseDate, voteAverage })}
          />
        );
      })}
      {
        // render if it's movies from api (with results property)
        movies.results && (
          <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
        )
      }
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
  removeRating: removeRatingAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'usersRatings' }])
)(MovieList);
