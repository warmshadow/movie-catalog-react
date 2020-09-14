import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieList from '../components/MovieList';
import { removeMovieFromWatchlist as removeMovieFromWatchlistAction } from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';
import withPaginationContext from '../context/withPaginationContext';

function Watchlist({
  auth,
  watchlist,
  watchlistInfo,
  movies,
  baseUrl,
  removeMovieFromWatchlist,
  context,
}) {
  const modalContext = useConfirmationModal();
  const { fetchOnListChange } = useFetchListMovies();

  const removeFromList = async (item) => {
    const result = await modalContext.showConfirmation({
      title: `Removing movie: ${item.title}`,
      content: 'Are you sure?',
      variant: 'danger',
    });
    if (result) {
      removeMovieFromWatchlist(item);
    }
  };

  // show 'load more' button when movies render, and hide when all loaded
  useEffect(() => {
    if (movies.items && movies.items.length / context.page !== 10) {
      context.hideLoadButton();
    } else if (movies.items) {
      context.showLoadButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  if (!auth.uid) return <Redirect to="/signin" />;

  if (!isLoaded(watchlistInfo) && !isLoaded(watchlist)) return <Spinner animation="border" />;

  if (!watchlistInfo) return <Redirect to="/notfound" />;

  // redirect if list doesn't belong to current user
  if (watchlistInfo.userId !== auth.uid) return <Redirect to="/notfound" />;

  if (watchlist) {
    const keys = Object.keys(watchlist);
    const watchlistToFetch = [];
    keys.forEach((key) => watchlist[key] && watchlistToFetch.push(watchlist[key]));
    const orderedWatchlistToFetch = watchlistToFetch.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );

    fetchOnListChange(orderedWatchlistToFetch);

    if (movies.isPending) return <Spinner animation="border" />;

    return (
      <div>
        <h2 className="mt-3 mb-5">My watchlist</h2>
        <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
      </div>
    );
  }
  return <div>No items found</div>;
}

const mapStateToProps = (state) => {
  const { firestore } = state;
  const { watchlistInfo } = firestore.data;
  const { watchlist } = firestore.data;

  return {
    auth: state.firebase.auth,
    watchlistInfo,
    watchlist,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  removeMovieFromWatchlist: removeMovieFromWatchlistAction,
};

export default compose(
  withPaginationContext,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'watchlists', doc: props.match.params.id, storeAs: 'watchlistInfo' },
    {
      collection: 'watchlists',
      doc: props.match.params.id,
      subcollections: [{ collection: 'movies' }],
      orderBy: ['createdAt', 'desc'],
      limit: 10 * props.context.page,
      storeAs: 'watchlist',
    },
  ])
)(Watchlist);
