import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { useLocation } from 'react-router-dom';
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
  auth,
}) {
  const { addToList, handleClose, selectedMovie, showModal } = useAddToList();
  const addToWatchlist = useAddToWatchlist();

  // check if inside watchlist route, for conditional 'add to watchlist' btn render
  const location = useLocation();
  const inWatchlist = location.pathname.split('/')[1] === 'watchlist';

  // check if inside watchlist, list, or ratings, for conditional PageLinks render
  const insideList = ['watchlist', 'lists', 'ratings'].some(
    (route) => route === location.pathname.split('/')[1]
  );

  const listItems = movies.results;

  return listItems.length ? (
    <>
      {listItems.map((movie) => {
        const item = keysToCamel(movie);

        const ratingDoc = userRatings && userRatings[`${item.id}_${auth.uid}`];
        const rating = ratingDoc && ratingDoc.rating;

        return (
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
        );
      })}
      {!insideList && (
        <PageLinks page={movies.page} totalPages={movies.total_pages} basePath={basePath} />
      )}
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

  return {
    auth,
    userRatings: usersRatings,
  };
};

const mapDispatchToProps = {
  setRating: setRatingAction,
  removeRating: removeRatingAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'usersRatings', where: ['userId', '==', props.auth.uid] },
  ])
)(MovieList);
