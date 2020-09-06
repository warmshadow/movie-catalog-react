import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieList from '../components/MovieList';
import { removeMovieFromList as removeMovieFromListAction } from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';
import useFetchListMovies from '../hooks/useFetchListMovies';

function List({ auth, mediaList, requesting, baseUrl, listId, removeMovieFromList }) {
  const modalContext = useConfirmationModal();
  const { fetchOnListChange, movies } = useFetchListMovies();

  const removeFromList = async (item) => {
    const result = await modalContext.showConfirmation({
      title: `Removing movie: ${item.title}`,
      content: 'Are you sure?',
      variant: 'danger',
    });
    if (result) removeMovieFromList(listId, item);
  };

  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (mediaList) {
      // redirect if list doesn't belong to current user
      if (mediaList.userId !== auth.uid) return <Redirect to="/notfound" />;

      // order - new items first
      const orderedItems = [...mediaList.items].reverse();
      fetchOnListChange(orderedItems);

      if (movies) {
        return (
          <div>
            <h2 className="mt-3 mb-5">{mediaList.name}</h2>
            <MovieList movies={movies} baseUrl={baseUrl} removeFromList={removeFromList} />
          </div>
        );
      }
      return <Spinner animation="border" />;
    }
    return <Redirect to="/notfound" />;
  }

  return <Spinner animation="border" />;
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { firestore } = state;
  const { mediaLists } = firestore.data;
  const mediaList = mediaLists ? mediaLists[id] : null;
  const requesting = firestore.status.requesting.mediaLists;

  return {
    auth: state.firebase.auth,
    mediaList,
    requesting,
    baseUrl: state.config.images.secure_base_url,
    listId: id,
  };
};

const mapDispatchToProps = {
  removeMovieFromList: removeMovieFromListAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['mediaLists'])
)(List);
