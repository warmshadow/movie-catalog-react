import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieList from '../components/MovieList';
import { removeMovieFromWatchlist as removeMovieFromWatchlistAction } from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';

function Watchlist({ auth, watchlist, requesting, movies, baseUrl, removeMovieFromWatchlist }) {
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

  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (watchlist) {
      // redirect if list doesn't belong to current user
      if (watchlist.userId !== auth.uid) return <Redirect to="/notfound" />;

      // order - new items first
      const orderedItems = [...watchlist.items].reverse();
      fetchOnListChange(orderedItems);

      if (movies.isPending) return <Spinner animation="border" />;

      return (
        <div>
          <h2 className="mt-3 mb-5">My watchlist</h2>
          <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
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
  const { watchlists } = firestore.data;
  const watchlist = watchlists ? watchlists[id] : null;
  const requesting = firestore.status.requesting.watchlists;

  return {
    auth: state.firebase.auth,
    watchlist,
    requesting,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  removeMovieFromWatchlist: removeMovieFromWatchlistAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['watchlists'])
)(Watchlist);
