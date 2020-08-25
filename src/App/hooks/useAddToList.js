import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useAddToList() {
  const auth = useSelector((state) => state.firebase.auth);

  const [selectedMovie, setSelectedMovie] = useState({});
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleAdd = (movie) => {
    if (auth.uid) {
      setSelectedMovie(movie);
      setShowModal(true);
    } else history.push('/signin');
  };

  const handleClose = () => setShowModal(false);

  return { handleAdd, handleClose, selectedMovie, showModal };
}

export default useAddToList;
