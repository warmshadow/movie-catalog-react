import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import Heading from '../components/Heading';
import MovieList from '../components/MovieList';
import { removeMovieFromWatchlist as removeMovieFromWatchlistAction } from '../actions';
import { useConfirmationModal } from '../context/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';
import { withPaginationContext } from '../context/PaginationContext';

function Watchlist({
  auth,
  watchlist,
  watchlistInfo,
  movies,
  baseUrl,
  removeMovieFromWatchlist,
  requested,
  paginationContext,
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

  const { hideLoadButton, showLoadButton, page } = paginationContext;

  // show 'load more' button when movies render, and hide when all loaded
  useEffect(() => {
    if (movies.results && movies.results.length / page !== 10) {
      hideLoadButton();
    } else if (movies.results) {
      showLoadButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  if (!auth.uid) return <Redirect to="/signin" />;

  if (!isLoaded(watchlistInfo, watchlist)) return <Spinner animation="border" />;

  if (isEmpty(watchlistInfo)) return <Redirect to="/notfound" />;

  // redirect if list doesn't belong to current user
  if (watchlistInfo.userId !== auth.uid) return <Redirect to="/notfound" />;

  // when switching to this route pause until request is finished to load all new data from db at once
  if (!requested && page === 1) return <Spinner animation="border" />;

  if (!isEmpty(watchlist)) {
    fetchOnListChange(watchlist);

    // if (movies.isPending) return <Spinner animation="border" />;

    return (
      <div>
        <Heading content="My watchlist" />
        {movies.isPending ? (
          <Spinner animation="border" />
        ) : (
          <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
        )}
        {/* <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} /> */}
      </div>
    );
  }
  return <div>No items found</div>;
}

const mapStateToProps = (state) => {
  const { firestore } = state;
  const { watchlistInfo } = firestore.data;
  const { watchlist } = firestore.ordered;
  const { watchlistInfo: reqWatchlistInfo, watchlist: reqWatchlist } = firestore.status.requested;
  const requested = !!(reqWatchlistInfo && reqWatchlist);

  return {
    auth: state.firebase.auth,
    watchlistInfo,
    watchlist,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
    requested,
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
      limit: 10 * props.paginationContext.page,
      storeAs: 'watchlist',
    },
  ])
)(Watchlist);
