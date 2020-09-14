import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieList from '../components/MovieList';
import { removeRating as removeRatingAction } from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';
import withPaginationContext from '../context/withPaginationContext';

function Ratings({ auth, ratingsList, ratingsListInfo, movies, baseUrl, removeRating, context }) {
  const modalContext = useConfirmationModal();
  const { fetchOnListChange } = useFetchListMovies();

  const removeFromList = async (item) => {
    const result = await modalContext.showConfirmation({
      title: `Removing movie: ${item.title}`,
      content: `This will also remove your rating for this movie.\nAre you sure?`,
      variant: 'danger',
    });
    if (result) {
      removeRating(item);
    }
  };

  // show 'load more' button when movies render, and hide when all loaded
  useEffect(() => {
    if (movies.items && movies.items.length / context.page !== 5) {
      context.hideLoadButton();
    } else if (movies.items) {
      context.showLoadButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  if (!auth.uid) return <Redirect to="/signin" />;

  if (!isLoaded(ratingsListInfo) && !isLoaded(ratingsList)) return <Spinner animation="border" />;

  if (!ratingsListInfo) return <Redirect to="/notfound" />;

  // redirect if list doesn't belong to current user
  if (ratingsListInfo.userId !== auth.uid) return <Redirect to="/notfound" />;

  if (ratingsList) {
    const keys = Object.keys(ratingsList);
    const ratingsListToFetch = [];
    keys.forEach((key) => ratingsList[key] && ratingsListToFetch.push(ratingsList[key]));
    const orderedRatingsListToFetch = ratingsListToFetch.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );

    fetchOnListChange(orderedRatingsListToFetch);

    if (movies.isPending) return <Spinner animation="border" />;

    return (
      <div>
        <h2 className="mt-3 mb-5">My ratings</h2>
        <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
      </div>
    );
  }
  return <div>No items found</div>;
}

const mapStateToProps = (state) => {
  const { firestore } = state;
  const { ratingsListInfo } = firestore.data;
  const { ratingsList } = firestore.data;

  return {
    auth: state.firebase.auth,
    ratingsListInfo,
    ratingsList,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  removeRating: removeRatingAction,
};

export default compose(
  withPaginationContext,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'ratingsLists',
      doc: props.match.params.id,
      storeAs: 'ratingsListInfo',
    },
    {
      collection: 'ratingsLists',
      doc: props.match.params.id,
      subcollections: [{ collection: 'movies' }],
      orderBy: ['createdAt', 'desc'],
      limit: 5 * props.context.page,
      storeAs: 'ratingsList',
    },
  ])
)(Ratings);
