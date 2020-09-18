import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import Heading from '../components/Heading';
import {
  createMediaList as createMediaListAction,
  deleteMediaList as deleteMediaListAction,
} from '../actions';
import CreateList from '../components/CreateList';
import { useConfirmationModal } from '../context/ConfirmationModalContext';

const Options = ({ deleteMediaList }) => {
  return (
    <div className="position-absolute right-0 z-index-100 p-4">
      <Button variant="outline-danger" className="btn-sm" onClick={deleteMediaList}>
        Delete List
      </Button>
    </div>
  );
};

function Lists({ auth, mediaLists, createMediaList, deleteMediaList }) {
  const modalContext = useConfirmationModal();

  const createList = async (list) => {
    const result = await modalContext.showConfirmation({
      title: `Creating list: ${list.name}`,
      content: 'Are you sure?',
      variant: 'primary',
    });
    if (result) createMediaList(list);
  };

  const deleteList = async (list) => {
    const result = await modalContext.showConfirmation({
      title: `Deleting list: ${list.name}`,
      content: 'Are you sure?',
      variant: 'danger',
    });
    if (result) deleteMediaList(list);
  };

  if (!auth.uid) return <Redirect to="/signin" />;

  if (!isLoaded(mediaLists)) return <Spinner animation="border" />;

  return (
    <>
      <Heading content="My lists:" italic />
      {!isEmpty(mediaLists) ? (
        <ListGroup className="mb-4">
          {mediaLists.map((list) => {
            const { id, name, createdAt } = list;

            // wait for timestamp to be set after creating new list
            if (!createdAt) return <Spinner animation="border" />;

            const creationDate = moment(createdAt.toDate()).format('MMM D, YYYY');

            return (
              <ListGroup.Item
                className="listItem d-flex align-items-center justify-content-center"
                key={id}
              >
                <Link className="text-decoration-none stretched-link" to={`/lists/${id}`} />
                <div>
                  <h5>{name}</h5>
                  <h6>{creationDate}</h6>
                </div>
                <Options deleteMediaList={() => deleteList(list)} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <h3 className="mb-4">No lists found</h3>
      )}
      <CreateList createList={createList} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { mediaLists } = state.firestore.ordered;
  return {
    mediaLists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = {
  createMediaList: createMediaListAction,
  deleteMediaList: deleteMediaListAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'mediaLists',
      where: ['userId', '==', props.auth.uid],
      orderBy: ['createdAt'],
    },
  ])
)(Lists);
