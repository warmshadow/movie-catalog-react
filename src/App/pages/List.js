import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import Heading from '../components/Heading';
import MovieList from '../components/MovieList';
import { removeMovieFromList as removeMovieFromListAction } from '../actions';
import { useConfirmationModal } from '../context/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';
import { withPaginationContext } from '../context/PaginationContext';

function List({
  auth,
  mediaList,
  mediaListInfo,
  movies,
  baseUrl,
  listId,
  removeMovieFromList,
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
    if (result) removeMovieFromList(listId, item);
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

  if (!isLoaded(mediaListInfo, mediaList)) return <Spinner animation="border" />;

  if (isEmpty(mediaListInfo)) return <Redirect to="/notfound" />;

  // redirect if list doesn't belong to current user
  if (mediaListInfo.userId !== auth.uid) return <Redirect to="/notfound" />;

  // when switching to this route pause until request is finished to load all new data from db at once
  if (!requested && page === 1) return <Spinner animation="border" />;

  // fetch movies from api
  fetchOnListChange(mediaList);

  if (movies.isPending) return <Spinner animation="border" />;

  return (
    <div>
      <Heading content={mediaListInfo.name} />
      <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { firestore } = state;
  const { mediaListInfo } = firestore.data;
  const { mediaList } = firestore.ordered;
  const { mediaListInfo: reqMediaListInfo, mediaList: reqMediaList } = firestore.status.requested;
  const requested = !!(reqMediaListInfo && reqMediaList);

  return {
    auth: state.firebase.auth,
    mediaListInfo,
    mediaList,
    movies: state.movies,
    baseUrl: state.config.images.secure_base_url,
    listId: id,
    requested,
  };
};

const mapDispatchToProps = {
  removeMovieFromList: removeMovieFromListAction,
};

export default compose(
  withPaginationContext,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'mediaLists', doc: props.match.params.id, storeAs: 'mediaListInfo' },
    {
      collection: 'mediaLists',
      doc: props.match.params.id,
      subcollections: [{ collection: 'movies' }],
      orderBy: ['createdAt', 'desc'],
      limit: 10 * props.paginationContext.page,
      storeAs: 'mediaList',
    },
  ])
)(List);
