import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieList from '../components/MovieList';
import { removeRating as removeRatingAction } from '../actions';
import { useConfirmationModal } from '../components/ConfirmationModalContext';

function Ratings({ auth, ratingsList, requesting, baseUrl, removeRating }) {
  const modalContext = useConfirmationModal();
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

  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (ratingsList) {
      // redirect if list doesn't belong to current user
      if (ratingsList.userId !== auth.uid) return <Redirect to="/notfound" />;

      // order - new items first
      const orderedItems = [...ratingsList.items].reverse();
      const orderedRatingsList = { ...ratingsList, items: orderedItems };

      return (
        <div>
          <h2 className="mt-3 mb-5">Your ratings</h2>
          <MovieList
            movies={orderedRatingsList}
            baseUrl={baseUrl}
            removeFromList={removeFromList}
          />
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
  const { ratingsLists } = firestore.data;
  const ratingsList = ratingsLists ? ratingsLists[id] : null;
  const requesting = firestore.status.requesting.ratingsLists;

  return {
    auth: state.firebase.auth,
    ratingsList,
    requesting,
    baseUrl: state.config.images.secure_base_url,
  };
};

const mapDispatchToProps = {
  removeRating: removeRatingAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['ratingsLists', 'usersRatings'])
)(Ratings);
