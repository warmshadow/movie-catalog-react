import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from '../components/MovieCard';

function Ratings({ auth, ratingsList, requesting, baseUrl }) {
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
              return (
                <MovieCard
                  id={id}
                  posterPath={posterPath}
                  title={title}
                  releaseDate={releaseDate}
                  voteAverage={voteAverage}
                  score={3.5}
                  baseUrl={baseUrl}
                  key={id}
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

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'ratingsLists' }])
)(Ratings);
