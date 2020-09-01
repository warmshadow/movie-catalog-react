import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMediaQuery } from 'react-responsive';
import AlertTooltip from './AlertTooltip';

function SearchBar({ handleCollapse, showTooltip, setShowTooltip }) {
  const [value, setValue] = useState('');

  const target = useRef(null);
  const timeoutRef = useRef(null);

  const screenSm = useMediaQuery({ query: '(min-width: 576px)' });

  const history = useHistory();

  // clear before set so it's always 2sec from the click
  const setTooltipTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (value.trim()) {
      history.push(`/search/${value}`);
      setValue('');
      handleCollapse();
    } else {
      setShowTooltip(true);
      setTooltipTimeout();
      setValue('');
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      <Form inline onSubmit={handleSearch} className="d-flex justify-content-center my-2 my-lg-0">
        <Form.Control
          ref={target}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Movie title.."
          className="mr-sm-2"
        />
        <Button variant="secondary" className="my-2 my-sm-0" type="submit">
          Search
        </Button>
      </Form>
      <AlertTooltip
        target={target}
        show={showTooltip}
        placement={screenSm ? 'left' : 'top-start'}
        content="Input is empty"
      />
    </>
  );
}

export default SearchBar;
