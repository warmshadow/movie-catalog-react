import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { useLocation } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';
import PageLinks from './PageLinks';
import MovieCard from './MovieCard';
import AddToListModal from './AddToListModal';
import { setRating as setRatingAction, removeRating as removeRatingAction } from '../actions';
import useAddToList from '../hooks/useAddToList';
import useAddToWatchlist from '../hooks/useAddToWatchlist';

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
  removeFromList,
  userRatings,
  setRating,
  removeRating,
}) {
  const { addToList, handleClose, selectedMovie, showModal } = useAddToList();
  const addToWatchlist = useAddToWatchlist();

  // check if inside watchlist route, for conditional 'add to watchlist' btn render
  const location = useLocation();
  const inWatchlist = location.pathname.split('/')[1] === 'watchlist';

  const listItems = movies.results || movies.items;

  const transition = useTransition(listItems, null, {
    config: config.gentle,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    keys: listItems.map((item) => item.id),
  });

  return listItems.length ? (
    <>
      {transition.map(({ item: movie, props, key }) => {
        const item = keysToCamel(movie);

        const rating = userRatings && userRatings.items[item.id];

        return (
          <animated.div style={props} key={key}>
            <MovieCard
              item={item}
              rating={rating && rating}
              baseUrl={baseUrl}
              key={item.id}
              add={() => addToList(item)}
              remove={removeFromList ? () => removeFromList(item) : null}
              addToWatchlist={inWatchlist ? null : () => addToWatchlist(item)}
              setRating={
                (newRating) => setRating(newRating, item)
                // eslint-disable-next-line react/jsx-curly-newline
              }
              removeRating={() => removeRating(item)}
            />
          </animated.div>
        );
      })}
      {
        // render if it's movies from api (with results property)
        movies.results && (
          <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
        )
      }
      <AddToListModal show={showModal} item={selectedMovie} handleClose={handleClose} />
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
