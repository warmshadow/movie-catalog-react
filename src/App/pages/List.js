import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import { removeMovieFromList as removeMovieFromListAction } from '../actions';
import MovieCard from '../components/MovieCard';

function List({ auth, mediaList, requesting, baseUrl, listId, removeMovieFromList }) {
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
              const { id, posterPath, title, releaseDate } = item;
              return (
                <MovieCard
                  id={id}
                  posterPath={posterPath}
                  title={title}
                  releaseDate={releaseDate}
                  baseUrl={baseUrl}
                  key={id}
                  remove={() => removeMovieFromList(listId, item)}
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
  firestoreConnect([{ collection: 'mediaLists' }])
)(List);
