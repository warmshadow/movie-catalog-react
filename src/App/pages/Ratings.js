import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from '../components/MovieCard';
import { setRating as setRatingAction } from '../actions';

function Ratings({ auth, ratingsList, requesting, baseUrl, userRatings, setRating }) {
  if (!auth.uid) return <Redirect to="/signin" />;

  if (requesting === false) {
    if (ratingsList) {
      // redirect if list doesn't belong to current user
      if (ratingsList.userId !== auth.uid) return <Redirect to="/notfound" />;

      // order - new items first
      const listItems = [...ratingsList.items].reverse();

      return (
        <div>
          <h2 className="mt-3 mb-5">{ratingsList.name}</h2>
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
                  setRating={
                    (newRating) =>
                      setRating(id, newRating, posterPath, title, releaseDate, voteAverage)
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
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
  const { ratingsLists, usersRatings } = firestore.data;
  const ratingsList = ratingsLists ? ratingsLists[id] : null;
  const requesting = firestore.status.requesting.ratingsLists;
  const userRatings = usersRatings ? usersRatings[auth.uid] : null;

  return {
    auth: state.firebase.auth,
    ratingsList,
    requesting,
    baseUrl: state.config.images.secure_base_url,
    userRatings,
  };
};

const mapDispatchToProps = {
  setRating: setRatingAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(['ratingsLists', 'usersRatings'])
)(Ratings);
