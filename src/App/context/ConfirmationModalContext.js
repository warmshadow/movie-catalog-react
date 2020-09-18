import React, { createContext, useContext, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ConfirmationModalContext = createContext({});

export const useConfirmationModal = () => useContext(ConfirmationModalContext);

export const ConfirmationModalContextProvider = ({ children }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [options, setOptions] = useState(null);

  const resolver = useRef();

  const handleShow = (newOptions) => {
    setShowConfirmationModal(true);
    setOptions(newOptions);

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleYes = () => {
    if (resolver.current) resolver.current(true);
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    if (resolver.current) resolver.current(false);
    setShowConfirmationModal(false);
  };

  return (
    <>
      <ConfirmationModalContext.Provider value={{ showConfirmation: handleShow }}>
        {children}
      </ConfirmationModalContext.Provider>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header>
          <Modal.Title>{options && options.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p style={{ whiteSpace: 'pre-wrap' }}>{options && options.content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            No
          </Button>
          <Button variant={options && options.variant} onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
