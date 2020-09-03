import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from '../components/MovieCard';
import {
  removeMovieFromList as removeMovieFromListAction,
  setRating as setRatingAction,
} from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';

function List({
  auth,
  mediaList,
  requesting,
  baseUrl,
  listId,
  removeMovieFromList,
  userRatings,
  setRating,
}) {
  const modalContext = useConfirmationModal();

  const removeFromList = async (item) => {
    const result = await modalContext.showConfirmation({
      title: `Removing movie: ${item.title}`,
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
      const listItems = [...mediaList.items].reverse();

      return (
        <div>
          <h2 className="mt-3 mb-5">{mediaList.name}</h2>
          {listItems.length !== 0 ? (
            listItems.map((item) => {
              const { id, posterPath, title, releaseDate, voteAverage } = item;
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
                  remove={() => removeFromList(item)}
                  setRating={setRating}
                />
              );
            })
          ) : (
            <h5>No items in the list</h5>
          )}
        </div>
      );
    }
    return <Redirect to="/notfound" />;
  }

  return <Spinner animation="border" />;
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { auth } = state.firebase;
  const { firestore } = state;
  const { mediaLists, usersRatings } = firestore.data;
  const mediaList = mediaLists ? mediaLists[id] : null;
  const requesting = firestore.status.requesting.mediaLists;
  const userRatings = usersRatings ? usersRatings[auth.uid] : null;

  return {
    auth: state.firebase.auth,
    mediaList,
    requesting,
    baseUrl: state.config.images.secure_base_url,
    listId: id,
    userRatings,
  };
};

const mapDispatchToProps = {
  removeMovieFromList: removeMovieFromListAction,
  setRating: setRatingAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['mediaLists', 'usersRatings'])
)(List);
