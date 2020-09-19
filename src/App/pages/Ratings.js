import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import Heading from '../components/Heading';
import MovieList from '../components/MovieList';
import { removeRating as removeRatingAction } from '../actions';
import { useConfirmationModal } from '../context/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';
import { withPaginationContext } from '../context/PaginationContext';

function Ratings({
  auth,
  ratingsList,
  ratingsListInfo,
  movies,
  baseUrl,
  removeRating,
  requested,
  paginationContext,
}) {
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

  if (!isLoaded(ratingsListInfo, ratingsList)) return <Spinner animation="border" />;

  if (isEmpty(ratingsListInfo)) return <Redirect to="/notfound" />;

  // redirect if list doesn't belong to current user
  if (ratingsListInfo.userId !== auth.uid) return <Redirect to="/notfound" />;

  // when switching to this route pause until request is finished to load all new data from db at once
  if (!requested && page === 1) return <Spinner animation="border" />;

  // fetch movies from api
  fetchOnListChange(ratingsList);

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <div>
      <Heading content="My ratings" />
      <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { firestore } = state;
  const { ratingsListInfo } = firestore.data;
  const { ratingsList } = firestore.ordered;
  const {
    ratingsListInfo: reqRatingsListInfo,
    ratingsList: reqRatingsList,
  } = firestore.status.requested;
  const requested = !!(reqRatingsListInfo && reqRatingsList);

  return {
    auth: state.firebase.auth,
    ratingsListInfo,
    ratingsList,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
    requested,
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
      limit: 10 * props.paginationContext.page,
      storeAs: 'ratingsList',
    },
  ])
)(Ratings);
