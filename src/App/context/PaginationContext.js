import React, { createContext, useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

export const PaginationContext = createContext({});

export const usePagination = () => useContext(PaginationContext);

export const PaginationContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const incrementPage = () => setPage((state) => state + 1);

  const hideLoadButton = () => {
    setShow(false);
  };

  const showLoadButton = () => {
    setShow(true);
  };

  const { pathname } = useLocation();

  // reset state on path change so it renders initial amount of results in a newly accessed list
  useEffect(() => {
    return () => {
      setShow(false);
      setPage(1);
    };
  }, [pathname]);

  return (
    <>
      <PaginationContext.Provider value={{ page, hideLoadButton, showLoadButton }}>
        {children}
      </PaginationContext.Provider>
      {show && (
        <Button variant="primary" onClick={incrementPage}>
          Load more..
        </Button>
      )}
    </>
  );
};
